import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";
import { H3Event } from "h3";
import { RegisterDTO } from "~/types/User";
import { randomUUID } from 'crypto';
import { join } from 'path';
import { promises as fs } from 'fs';

const SALT_ROUNDS = 10;

const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
];

async function uploadImage(file: string, allowedTypes: string[], maxFileSize: number) {
    const matches = file.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return createError({ statusCode: 400, message: 'Invalid file format' });
    }

    const [mimeType, base64Data] = [matches[1], matches[2]];
    if (!allowedTypes.includes(mimeType)) {
        return createError({
            statusCode: 400,
            message: `Unsupported file type. Allowed types: ${ allowedTypes.join(', ') }`
        });
    }
    const buffer = Buffer.from(base64Data, 'base64');

    if (buffer.byteLength > maxFileSize) {
        return createError({
            statusCode: 400,
            message: 'File size exceeds 2MB limit'
        });
    }

    // Generate unique filename
    const extension = mimeType.split('/')[1];
    const fileName = `${ randomUUID() }.${ extension }`;
    const uploadDir = join(process.cwd(), 'public/uploads');
    const filePath = join(uploadDir, fileName);
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);

    return fileName;
}

export default defineEventHandler(async (event: H3Event) => {
    try {
        const body = await readBody(event) as RegisterDTO;

        if (!body) {
            return createError({
                statusCode: 401,
                message: "Request body is empty or undefined"
            });
        }

        const { email, name, password, confirmPassword, avatar } = body;

        if (!email || !name || !password || !avatar) {
            return createError({
                statusCode: 401,
                message: "Required fields are empty."
            });
        }

        await uploadImage(avatar, ALLOWED_MIME_TYPES, 2 * 1024 * 1024);

        if (password !== confirmPassword) {
            return createError({
                statusCode: 400,
                message: "Password and confirmation do not match"
            });
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const userData = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                salt: salt,
                avatar: 'C:\\Users\\Nayantha\\logo-kid-gamer_573604-742.avif'
            }
        });

        await setUserSession(event, {
            user: userData,
            loggedInAt: new Date().toISOString(),
        });

        return { success: true, userData };
    }

    catch (error) {
        console.error(error)
        // @ts-ignore
        if (error.code === "P2002") {
            return  createError({
                statusCode: 409,
                statusMessage: "Email already exists.",
            });
        }
        return createError({
            statusCode: 400,
            statusMessage: "Failed to process request",
        });
    }
})