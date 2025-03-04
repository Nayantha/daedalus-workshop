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
const { data: items, error } = await useFetch('/api/items');
</script>

<style scoped>

</style>