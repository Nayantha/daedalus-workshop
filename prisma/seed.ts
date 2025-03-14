import {ItemType, Rarity, TagType} from '@prisma/client';
import {faker} from '@faker-js/faker';
import prisma from "~/lib/prisma";

const RARITIES = Object.values(Rarity);
const ITEM_TYPES = Object.values(ItemType);
const TAG_TYPES = Object.values(TagType);
const IMAGE_PATHS = [
    "https://dummyimage.com/420x260/ff0000/ffffff", // Red
    "https://dummyimage.com/420x260/00ff00/ffffff", // Green
    "https://dummyimage.com/420x260/0000ff/ffffff", // Blue
    "https://dummyimage.com/420x260/ffff00/000000", // Yellow
    "https://dummyimage.com/420x260/ff00ff/ffffff", // Magenta
    "https://dummyimage.com/420x260/00ffff/000000", // Cyan
    "https://dummyimage.com/420x260/000000/ffffff", // Black
];


export async function main() {
    // Create Tags
    await prisma.tag.createMany({
        data: TAG_TYPES.map(name => ({name})),
        skipDuplicates: true,
    });

    // Create Base Items
    await Promise.all(
        Array.from({ length: 100 }).map(async () => {
            const itemType = faker.helpers.arrayElement(ITEM_TYPES);

            return prisma.item.create({
                data: {
                    name: `${ faker.commerce.productAdjective() } ${ faker.commerce.product() }`,
                    images: faker.helpers.arrayElements(IMAGE_PATHS, { min: 1, max: 3 }),
                    description: faker.commerce.productDescription(),
                    price: faker.number.float({ min: 1, max: 1000 }),
                    rarity: faker.helpers.arrayElement(RARITIES),
                    requiredLevel: faker.number.int({ min: 1, max: 60 }),
                    itemType,
                    tags: {
                        create: faker.helpers
                            .arrayElements(['Magical', 'Cursed', 'Ancient', 'Blessed', 'Limited'], { min: 1, max: 3 })
                            .map(tagName => ({
                                tag: {
                                    connect: { name: tagName }
                                }
                            }))
                    },
                },
                include: { tags: true }
            });
        })
    );
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });