import { Prisma } from '@prisma/client';
import prisma from "~/lib/prisma"

interface FetchItemsParams {
    page?: number;
    pageSize?: number;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    rarity?: string;
    tags?: string
}

function transformTagParamStringToArray(tagString: string | undefined) {
    if (!tagString) return [];
    return tagString.split(",");
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

    const transformedTags = transformTagParamStringToArray(tags);

    const where = {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
        ...(rarity && { rarity: rarity }),
        ...(tags && {
            AND: transformedTags.map(tagName => ({
                tags: {
                    some: {
                        tag: {
                            name: tagName
                        }
                    }
                }
            }))
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
