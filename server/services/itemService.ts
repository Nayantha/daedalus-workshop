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
    useAllTags: boolean
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
                                     useAllTags
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
        ...(tags && (useAllTags
                ?
                { AND: tagNameFilters }
                : { OR: tagNameFilters })
        )
    } as Prisma.ItemsWhereInput;

    try {
        const items = await prisma.items.findMany({
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

        const totalItems = await prisma.items.count({ where });

        return { items, totalItems };
    } catch (error) {
        console.error(error);
        return { items: {}, totalItems: 0 };
    }
};
