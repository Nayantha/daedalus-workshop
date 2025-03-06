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
const name = route.query.name as string;
const minPrice = parseFloat(route.query.minPrice as string);
const maxPrice = parseFloat(route.query.maxPrice as string);
const rarity = route.query.rarity as string;
const tags = route.query.tags as string | "";

const { data, error } = await useFetch('/api/items',
    { params: { page, pageSize, name, minPrice, maxPrice, rarity, tags } }
);
const {
    items,
} = data.value || {};
</script>

<style scoped>

</style>