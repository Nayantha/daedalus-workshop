import prisma from "~/lib/prisma";
import { H3Event } from "h3";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event: H3Event) => {
    try {
        const body = await readBody(event);

        if (!body) {
            createError({
                statusCode: 401,
                message: "Request body is empty or undefined"
            });
        }
        const {email, password} = body;

        if (!email || !password) {
            createError({
                statusCode: 401,
                message: "Required fields are empty."
            });
        }

        const userData = await prisma.user.findUniqueOrThrow({
            where: { email: email }
        });

        if (!(await bcrypt.compare(password, userData.password))) {
            console.error(`Invalid password for user: ${userData.name}, id: ${userData.id}`);
            return createError({
                statusCode: 401,
                statusMessage: "Invalid password",
            });
        } else {
            await setUserSession(event, {
                user: userData,
                loggedInAt: Date.now(),
            });
        }

        return { success: true, userData };
    }

    catch (error) {
        console.error(error);

        // @ts-ignore
        if (error.code === "P2025") {
            throw createError({ statusCode: 404, statusMessage: "User not found" });
        }
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
})