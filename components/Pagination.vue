<template>
    <div class="pagination">
        <div class="pagination-info">
            Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} items
        </div>

        <div class="pagination-controls">
            <button
                    :disabled="currentPage === 1"
                    class="pagination-button"
                    @click="onPageChange(1)"
            >
                First
            </button>

            <button
                    :disabled="currentPage === 1"
                    class="pagination-button"
                    @click="onPageChange(currentPage - 1)"
            >
                Previous
            </button>

            <span class="page-numbers">
              <template v-for="pageNum in displayedPageNumbers" :key="pageNum">
                <button
                        v-if="pageNum !== '...'"
                        :class="['page-number-button', { active: pageNum === currentPage }]"
                        :disabled="pageNum === currentPage"
                        @click="onPageChange(pageNum)"
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
                    @click="onPageChange(currentPage + 1)"
            >
                Next
            </button>

            <button
                    :disabled="currentPage === totalPages"
                    class="pagination-button"
                    @click="onPageChange(totalPages)"
            >
                Last
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    pageSize: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});

const route = useRoute();
const router = useRouter();

const startItem = computed(() => (props.currentPage - 1) * props.pageSize + 1);
const endItem = computed(() => Math.min(props.currentPage * props.pageSize, <number>props.totalItems));

const displayedPageNumbers = computed(() => {
    const range = [];
    const maxPagesToShow = 5;

    if (props.totalPages <= maxPagesToShow) {
        for (let i = 1; i <= props.totalPages; i++) range.push(i);
    } else {
        range.push(1);
        const leftOffset = Math.floor(maxPagesToShow / 2) - 1;
        const rightOffset = Math.ceil(maxPagesToShow / 2) - 1;

        let rangeStart = props.currentPage - leftOffset;
        let rangeEnd = props.currentPage + rightOffset;

        if (rangeStart <= 1) {
            rangeStart = 2;
            rangeEnd = Math.min(props.totalPages - 1, maxPagesToShow - 1);
        }

        if (rangeEnd >= props.totalPages) {
            rangeEnd = props.totalPages - 1;
            rangeStart = Math.max(2, props.totalPages - maxPagesToShow + 2);
        }

        if (rangeStart > 2) {
            range.push('...');
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            range.push(i);
        }

        if (rangeEnd < props.totalPages - 1) {
            range.push('...');
        }

        if (props.totalPages > 1) {
            range.push(props.totalPages);
        }
    }

    return range;
});

const onPageChange = (newPage) => {
    if (newPage < 1 || newPage > props.totalPages || newPage === props.currentPage) {
        return;
    }
    router.push({
        query: {
            ...route.query,
            page: newPage
        }
    });
};
</script>

<style scoped>
</style>