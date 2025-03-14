<template>
    <div>
        <FilterMenu/>
        <div class="flex w-8/12 mx-auto justify-between bg-stone-100 p-0.5 relative rounded-lg my-4" role="tablist">
            <a v-for="(itemType, i) in ITEM_TYPES"
               :key="i"
               :data-dui-tab-target="`tab${i}-group`"
               :href="`?itemType=${itemType.toLowerCase()}`"
               class="text-sm active inline-block py-2 px-4 text-stone-800 transition-all duration-300 relative z-1 mr-1">
                {{ itemType.toLowerCase() }}
            </a>
        </div>
        <div v-if="error">{{ error.message }}</div>
        <div v-else-if="!items">Loading...</div>
        <div v-else>
            <section class="text-gray-400 bg-gray-900 body-font">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-wrap -m-4">
                        <div v-for="item in items" :key="item.id" class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <ListItem :item="item"/>
                        </div>
                    </div>
                </div>
            </section>
            <Pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total-items="totalItems"
                :total-pages="totalPages"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterMenu from "~/components/Filter.vue";
import {ItemType} from "@prisma/client";
import type {ItemWithTags} from "~/types/Item";

const ITEM_TYPES = Object.values(ItemType);

const route = useRoute();

const currentPage = ref<number>(parseInt(route.query.page as string) || 1);
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 10);

const fetchParams = computed(() => {
    return {
        page: currentPage.value,
        pageSize: parseInt(pageSize.value),
        name: route.query.name as string,
        minPrice: parseFloat(route.query.minPrice as string),
        maxPrice: parseFloat(route.query.maxPrice as string),
        rarity: route.query.rarity as string,
        tags: route.query.tags as string | "",
        useAllTags: route.query.useAllTags?.toString() === "true",
        itemType: route.query.itemType
            ? (route.query.itemType as string)?.split(",").map(type =>
                type.toUpperCase()
            )
            : [],
        rate: route.query.itemRate?.toString().toUpperCase(),
        minRequiredLevel: parseInt(route.query.minReqLvl as string),
        maxRequiredLevel: parseInt(route.query.maxReqLvl as string),
    };
});

const { data, error } = await useFetch('/api/items', {
    params: fetchParams,
    watch: [fetchParams]
});

const items = computed<ItemWithTags[]>(() => data.value?.items || []);
const totalItems = computed<number>(() => data.value?.totalItems || 0);
const totalPages = computed<number>(() => data.value?.totalPages || 1);

watch(() => route.query, (newQuery) => {
    currentPage.value = parseInt(newQuery.page as string) || 1;
    pageSize.value = parseInt(newQuery.pageSize as string) || 10;
}, { deep: true });

useHead({
    title: "Items Page"
})
</script>

<style scoped>

</style>