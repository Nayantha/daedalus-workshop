import { H3Event } from "h3";
import { fetchItems } from "~/server/services/itemService";

export default defineEventHandler(async (event: H3Event) => {
    try {
        const query = getQuery(event);
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const filterName = query.filterName as string;
        const minPrice = parseFloat(query.minPrice as string);
        const maxPrice = parseFloat(query.maxPrice as string);
        const rarity = query.rarity as string;

        const { items, totalItems } = await fetchItems({
            page,
            pageSize,
            filterName,
            minPrice,
            maxPrice,
            rarity,
        });

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