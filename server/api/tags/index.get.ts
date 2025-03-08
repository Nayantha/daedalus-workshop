import { H3Event } from "h3";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event: H3Event) => {
    try {
        const tags = await prisma.tags.findMany();
        return { tags };
    } catch (error) {
        console.error(error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
})