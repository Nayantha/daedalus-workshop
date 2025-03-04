import { Prisma } from '@prisma/client';
import prisma from "~/lib/prisma"

interface FetchItemsParams {
    page?: number;
    pageSize?: number;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    rarity?: string;
    tags?: string[]
}

export const fetchItems = async ({
                                     page = 1,
                                     pageSize = 10,
                                     name,
                                     minPrice,
                                     maxPrice,
                                     rarity,
                                     tags,
                                 }: FetchItemsParams) => {
    const itemsToSkip = (page - 1) * pageSize;
    const noItemsPerPage = pageSize;

    const where = {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
        ...(rarity && { rarity: rarity }),
        ...(tags && {
            tags: {
                every: {
                    tag: {
                        name: {
                            in: Array.isArray(tags)
                                ? tags
                                : [tags]
                        }
                    }
                }
            }
        })
    } as Prisma.ItemWhereInput;

    try {
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
    } catch (error) {
        console.error(error);
        return { items: {}, totalItems: 0 };
    }
};
