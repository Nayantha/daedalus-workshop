<template>
    <div>
        <div v-if="error">{{ error.message }}</div>
        <div v-else-if="!items">Loading...</div>
        <div v-else>
            <div v-for="item in items" :key="item.id">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = parseInt(route.query.page as string) || 1;
const pageSize = parseInt(route.query.pageSize as string) || 10;
const filterName = route.query.filterName as string;
const minPrice = parseFloat(route.query.minPrice as string);
const maxPrice = parseFloat(route.query.maxPrice as string);
const rarity = route.query.filterRarity as string;

const { data, error } = await useFetch('/api/items',
    { params: { page, pageSize, filterName, minPrice, maxPrice, rarity } }
);
const {
    items,
} = data.value || {};
</script>

<style scoped>

</style>