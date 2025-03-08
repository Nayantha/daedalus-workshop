<template>
    <div>
        <FilterMenu/>
        <div v-if="error">{{ error.message }}</div>
        <div v-else-if="!items">Loading...</div>
        <div v-else>
            <div v-for="item in items" :key="item.id">
                {{ item }}
            </div>
        </div>
        <div class="pagination">

            <div class="pagination-info">
                Showing {{
                    (page - 1) * pageSize + 1
                }}-{{ Math.min(page * pageSize, totalItems) }}
                of {{ totalItems }} items
            </div>

            <div class="pagination-controls">

                <button
                    :disabled="page === 1"
                    class="pagination-button"
                    @click="changePage(1)"
                >
                    First
                </button>


            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterMenu from "~/components/Filter.vue";

const route = useRoute();
const router = useRouter();

const page = ref<number>(parseInt(route.query.page as string) || 1);
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 10);

const fetchParams = computed(() => {
    return {
        page: page.value,
        pageSize: parseInt(pageSize.value),
        name: route.query.name as string,
        minPrice: parseFloat(route.query.minPrice as string),
        maxPrice: parseFloat(route.query.maxPrice as string),
        rarity: route.query.rarity as string,
        tags: route.query.tags as string | "",
        useAllTags: route.query.useAllTags?.toString() === "true"
    };
});

const { data, error, refresh } = await useFetch('/api/items', {
    params: fetchParams,
    watch: [fetchParams]
});

const items = computed(() => data.value?.items || []);
const totalItems = computed(() => data.value?.totalItems || 0);
const totalPages = computed(() => data.value?.totalPages || 1);

const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page.value) {
        return;
    }
    router.push({
        query: {
            ...route.query,
            page: newPage
        }
    });
};

watch(() => route.query, (newQuery) => {
    page.value = parseInt(newQuery.page as string) || 1;
    pageSize.value = parseInt(newQuery.pageSize as string) || 10;
}, { deep: true });
</script>

<style scoped>

</style>