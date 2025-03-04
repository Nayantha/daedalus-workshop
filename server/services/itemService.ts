import { Prisma } from '@prisma/client';
import prisma from "~/lib/prisma"

interface FetchItemsParams {
    page?: number;
    pageSize?: number;
    filterName?: string;
    minPrice?: number;
    maxPrice?: number;
    rarity?: string;
}

export const fetchItems = async ({
                                     page = 1,
                                     pageSize = 10,
                                     filterName,
                                     minPrice,
                                     maxPrice,
                                     rarity,
                                 }: FetchItemsParams) => {
    const itemsToSkip = (page - 1) * pageSize;
    const noItemsPerPage = pageSize;

    const where = {
        ...(filterName && { name: { contains: filterName, mode: 'insensitive' } }),
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
        ...(rarity && { rarity: rarity }),
    } as Prisma.ItemWhereInput;

    const items = await prisma.item.findMany({
        skip: itemsToSkip,
        take: noItemsPerPage,
        where,
        include: {
            tags: {
                select: {
                    tag: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        },
    });

    // convert tag and item to tag and its name
    items.map(item => ({
        ...item,
        tags: item.tags.map(tagOnItem => tagOnItem.tag)
    }));

    const totalItems = await prisma.item.count({ where });

    return { items, totalItems };
};
