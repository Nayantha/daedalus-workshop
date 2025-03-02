import bcrypt from "bcrypt";
import prisma from "~/lib/prisma";
import { H3Event } from "h3";

const SALT_ROUNDS = 10;

export default defineEventHandler(async (event: H3Event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            createError({
                statusCode: 401,
                message: "Request body is empty or undefined"
            });
        }
        const {email, name, password} = body;

        if (!email || !name || !password) {
            createError({
                statusCode: 401,
                message: "Required fields are empty."
            });
        }

        // Hash password with salt
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const userData = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                salt: salt,
            }
        });

        await setUserSession(event, {
            user: userData,
            loggedInAt: Date.now(),
        });

        return { success: true, userData };
    }

    catch (error) {
        console.error(error)

        // @ts-ignore
        if (error.code === "P2002") {
            return  createError({
                statusCode: 400,
                statusMessage: "Email already exists.",
            });
        }
        return createError({
            statusCode: 500,
            statusMessage: "Failed to process request",
        });
    }
})