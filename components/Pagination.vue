<template>
    <div class="pagination flex flex-col items-center gap-2 my-2 py-4 dark:text-gray-200 dark:bg-gray-900">
        <div class="pagination-info">
            Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} items
        </div>
        <div class="pagination-controls dark:text-gray-200">
            <button
                :disabled="currentPage === 1"
                class="mr-4 pagination-button inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-gray-800 hover:bg-gray-800/5 hover:border-gray-800/5 shadow-none hover:shadow-none dark:text-gray-200 dark:bg-gray-800"
                @click="onPageChange(1)"
            >
                <svg class="mr-1.5 h-4 w-4 stroke-2" color="currentColor" fill="none" height="1.5em" stroke-width="1.5"
                     viewBox="0 0 24 24" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                    <path d="M10 6L5 12L10 18" stroke="currentColor" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                </svg>
                First
            </button>

            <button
                :disabled="currentPage === 1"
                class="pagination-button inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-gray-800 hover:bg-gray-800/5 hover:border-gray-800/5 shadow-none hover:shadow-none dark:text-gray-200 dark:bg-gray-800"
                @click="onPageChange(currentPage - 1)"
            >
                <svg class="mr-1.5 h-4 w-4 stroke-2" color="currentColor" fill="none" height="1.5em" stroke-width="1.5"
                     viewBox="0 0 24 24" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                </svg>
                Previous
            </button>

            <span class="page-numbers ml-4">
              <template v-for="pageNum in displayedPageNumbers" :key="pageNum">
                <button
                    v-if="pageNum !== '...'"
                    :class="['page-number-button', pageNum === currentPage ? 'shadow-sm hover:shadow-md bg-gray-800 border-gray-800 text-gray-50 hover:bg-gray-700 hover:border-gray-700' : 'bg-transparent border-transparent text-gray-800 hover:bg-gray-800/5 hover:border-gray-800/5 shadow-none hover:shadow-none dark:text-gray-400']"
                    :disabled="pageNum === currentPage"
                    class="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] rounded-md"
                    @click="onPageChange(pageNum)"
                >
                  {{ pageNum }}
                </button>
                <span v-else class="ellipsis">...</span>
              </template>
            </span>

            <span class="page-indicator mr-4">Page {{ currentPage }} of {{ totalPages }}</span>

            <button
                :disabled="currentPage === totalPages"
                class="pagination-button inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-gray-800 hover:bg-gray-800/5 hover:border-gray-800/5 shadow-none hover:shadow-none dark:text-gray-200 dark:bg-gray-800"
                @click="onPageChange(currentPage + 1)"
            >
                Next
                <svg class="ml-1.5 h-4 w-4 stroke-2" color="currentColor" fill="none" height="1.5em" stroke-width="1.5"
                     viewBox="0 0 24 24" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                </svg>
            </button>

            <button
                :disabled="currentPage === totalPages"
                class="ml-4 pagination-button inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-gray-800 hover:bg-gray-800/5 hover:border-gray-800/5 shadow-none hover:shadow-none dark:text-gray-200 dark:bg-gray-800"
                @click="onPageChange(totalPages)"
            >
                Last
                <svg class="ml-1.5 h-4 w-4 stroke-2" color="currentColor" fill="none" height="1.5em" stroke-width="1.5"
                     viewBox="0 0 24 24" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                    <path d="M14 6L20 12L14 18" stroke="currentColor" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                </svg>
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