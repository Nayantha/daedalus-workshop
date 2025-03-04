import prisma from "~/lib/prisma";
import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    try {
        const items = await prisma.item.findMany();
        // console.log(items);
        return items;
    } catch (error) {
        console.error(error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
})