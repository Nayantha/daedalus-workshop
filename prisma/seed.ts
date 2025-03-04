import { ItemType, MaterialType, Rarity, WeaponType, WearableSlot } from '@prisma/client';
import { faker } from '@faker-js/faker';
import prisma from "~/lib/prisma";

const RARITIES = Object.values(Rarity);
const ITEM_TYPES = Object.values(ItemType);
const WEAPON_TYPES = Object.values(WeaponType);
const SLOTS = Object.values(WearableSlot);
const MATERIAL_TYPES = Object.values(MaterialType);

export async function main() {
    // Create Tags
    await prisma.tag.createMany({
        data: ['Magical', 'Cursed', 'Ancient', 'Blessed', 'Limited'].map(name => ({ name })),
        skipDuplicates: true,
    });

    // Create Base Items
    await Promise.all(
        Array.from({ length: 100 }).map(async () => {
            const itemType = faker.helpers.arrayElement(ITEM_TYPES);

            return prisma.item.create({
                data: {
                    name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
                    description: faker.commerce.productDescription(),
                    price: faker.number.float({ min: 1, max: 1000}),
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