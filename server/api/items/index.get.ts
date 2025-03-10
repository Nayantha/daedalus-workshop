import { H3Event } from "h3";
import { fetchItems } from "~/server/services/itemService";

export default defineEventHandler(async (event: H3Event) => {
    try {
        const query = getQuery(event);

        const { items, totalItems } = await fetchItems({
            page: parseInt(query.page as string) || 1,
            pageSize: parseInt(query.pageSize as string) || 10,
            name: query.name as string,
            minPrice: parseFloat(query.minPrice as string),
            maxPrice: parseFloat(query.maxPrice as string),
            rarity: query.rarity as string,
            tags: query.tags as string,
            useAllTags: query.useAllTags === "true",
            itemType: query.itemType as string,
            rate: query.rate as string,
            minRequiredLevel: parseInt(query.minRequiredLevel as string),
            maxRequiredLevel: parseInt(query.maxRequiredLevel as string),
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