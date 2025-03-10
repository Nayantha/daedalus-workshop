import { H3Event } from "h3";
import { fetchItems } from "~/server/services/itemService";

export default defineEventHandler(async (event: H3Event) => {
    try {
        const query = getQuery(event);
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const name = query.name as string;
        const minPrice = parseFloat(query.minPrice as string);
        const maxPrice = parseFloat(query.maxPrice as string);
        const rarity = query.rarity as string;
        const tags = query.tags as string;
        const useAllTags = query.useAllTags === "true";
        const itemType = query.itemType as string;

        const { items, totalItems } = await fetchItems({
            page,
            pageSize,
            name,
            minPrice,
            maxPrice,
            rarity,
            tags,
            useAllTags,
            itemType
        });

        if (totalItems === 0) {
            return createError({
                statusCode: 404,
                message: "No Elements found."
            })
        }

        return {
            items,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            currentPage: page,
        };

    } catch (error) {
        console.error(error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
})