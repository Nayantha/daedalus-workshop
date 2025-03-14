<template>
    <div>
        <ImageCarousel :images="item.images" :name="item.name"/>
        <a class="block relative h-48 rounded overflow-hidden">
            <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                 src="https://dummyimage.com/420x260">
        </a>
        <div class="mt-4">
            <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                <span>{{ item.itemType }}</span>
            </h3>
            <h2 class="text-white title-font text-lg font-medium">{{ item.name }}</h2>
            <p class="mt-1">$ {{ item.price }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>

import type {ItemWithTags} from "~/types/Item";
import ImageCarousel from "~/components/ImageCarousel.vue";

defineProps<{
    item: ItemWithTags
}>();
</script>

<style scoped>

</style>