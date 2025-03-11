import { Prisma } from '@prisma/client';
import prisma from "~/lib/prisma"

interface FetchItemsParams {
    page?: number;
    pageSize?: number;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    rarity?: string;
    tags?: string;
    useAllTags: boolean,
    itemType?: string,
    rate?: string;
    minRequiredLevel?: number;
    maxRequiredLevel?: number;
}

function transformTagParamStringToArray(tagString: string | undefined) {
    if (!tagString) return [];
    return tagString.split(",").map(tag => tag.toUpperCase());
}

export const fetchItems = async ({
                                     page = 1,
                                     pageSize = 10,
                                     name,
                                     minPrice,
                                     maxPrice,
                                     rarity,
                                     tags,
                                     useAllTags,
                                     itemType,
                                     rate,
                                     minRequiredLevel,
                                     maxRequiredLevel,
                                 }: FetchItemsParams) => {
    const itemsToSkip = (page - 1) * pageSize;
    const noItemsPerPage = pageSize;

    const transformedTags = transformTagParamStringToArray(tags);

    const tagNameFilters = transformedTags.map(tagName => ({
        tags: {
            some: {
                tag: {
                    name: tagName
                }
            }
        }
    }));

    const where = {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(minPrice && { price: { gte: minPrice } }),
        ...(maxPrice && { price: { lte: maxPrice } }),
        ...(rarity && { rarity: rarity }),
        ...(itemType && { itemType: itemType }),
        ...(rate && { rate: rate.toUpperCase() }),
        ...(minRequiredLevel && { requiredLevel: { gte: minRequiredLevel } }),
        ...(maxRequiredLevel && { requiredLevel: { lte: maxRequiredLevel } }),
        ...(tags && (useAllTags
                ?
                { AND: tagNameFilters }
                : { OR: tagNameFilters })
        )
    } as Prisma.ItemWhereInput;

    try {
        const items = (await prisma.item.findMany({
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
        }))
            .map(item => ({
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
