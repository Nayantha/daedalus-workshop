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
                    (currentPage - 1) * pageSize + 1
                }}-{{ Math.min(currentPage * pageSize, totalItems) }}
                of {{ totalItems }} items
            </div>

            <div class="pagination-controls">

                <button
                    :disabled="currentPage === 1"
                    class="pagination-button"
                    @click="changePage(1)"
                >
                    First
                </button>

                <button
                    :disabled="currentPage === 1"
                    class="pagination-button"
                    @click="changePage(currentPage - 1)"
                >
                    Previous
                </button>

                <span class="page-numbers">
                    <template v-for="pageNum in displayedPageNumbers" :key="pageNum">
                        <button
                            v-if="pageNum !== '...'"
                            :class="['page-number-button', { active: pageNum === currentPage }]"
                            @click="changePage(pageNum)"
                        >
                            {{ pageNum }}
                        </button>
                        <span v-else class="ellipsis">...</span>
                    </template>
                </span>

                <span class="page-indicator">Page {{ currentPage }} of {{ totalPages }}</span>

                <button
                    :disabled="currentPage === totalPages"
                    class="pagination-button"
                    @click="changePage(currentPage + 1)"
                >
                    Next
                </button>

                <button
                    :disabled="currentPage === totalPages"
                    class="pagination-button"
                    @click="changePage(totalPages)"
                >
                    Last
                </button>

            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterMenu from "~/components/Filter.vue";

const route = useRoute();
const router = useRouter();

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
        useAllTags: route.query.useAllTags?.toString() === "true"
    };
});

const { data, error } = await useFetch('/api/items', {
    params: fetchParams,
    watch: [fetchParams]
});

const items = computed(() => data.value?.items || []);
const totalItems = computed(() => data.value?.totalItems || 0);
const totalPages = computed(() => data.value?.totalPages || 1);

const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage.value) {
        return;
    }
    router.push({
        query: {
            ...route.query,
            page: newPage
        }
    });
};

const displayedPageNumbers = computed(() => {
    const range = [];
    const maxPagesToShow = 5;

    if (totalPages.value <= maxPagesToShow) {
        for (let i = 1; i <= totalPages.value; i++) range.push(i)
    } else {
        range.push(1);
        const leftOffset = Math.floor(maxPagesToShow / 2) - 1;
        const rightOffset = Math.ceil(maxPagesToShow / 2) - 1;

        let rangeStart = currentPage.value - leftOffset;
        let rangeEnd = currentPage.value + rightOffset;

        if (rangeStart <= 1) {
            rangeStart = 2;
            rangeEnd = Math.min(totalPages.value - 1, maxPagesToShow - 1);
        }

        if (rangeEnd >= totalPages.value) {
            rangeEnd = totalPages.value - 1;
            rangeStart = Math.max(2, totalPages.value - maxPagesToShow + 2);
        }

        if (rangeStart > 2) {
            range.push('...');
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            range.push(i);
        }

        if (rangeEnd < totalPages.value - 1) {
            range.push('...');
        }

        if (totalPages.value > 1) {
            range.push(totalPages.value);
        }
    }

    return range;
});

watch(() => route.query, (newQuery) => {
    currentPage.value = parseInt(newQuery.page as string) || 1;
    pageSize.value = parseInt(newQuery.pageSize as string) || 10;
}, { deep: true });
</script>

<style scoped>

</style>