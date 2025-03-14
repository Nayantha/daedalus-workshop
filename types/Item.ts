import {Prisma} from '@prisma/client';

export type Item = Prisma.ItemCreateInput;

export type Tag = Omit<Prisma.TagCreateInput, "items">;

export type ItemWithTags = (Item & { tags: Tag[] } & { images: string[] })