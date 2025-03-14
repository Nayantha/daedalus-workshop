<template>
    <div>
        <!-- Image carousel -->
        <div class="relative w-full" data-carousel="slide">
            <!-- Carousel wrapper -->
            <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                <!-- Carousel items -->
                <div v-for="(img, i) in images" :key="i"
                     :class="{ 'opacity-0': activeSlide !== i, 'opacity-100': activeSlide === i }"
                     class="absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out">
                    <img :alt="`${name} image ${i+1}`" :src="img"
                         class="absolute block w-full h-full object-cover object-center"/>
                </div>
            </div>

            <!-- Carousel controls -->
            <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                <button v-for="(_, i) in images" :key="`dot-${i}`"
                        :class="{ 'bg-white': activeSlide === i, 'bg-gray-500': activeSlide !== i }"
                        class="w-3 h-3 rounded-full"
                        type="button"
                        @click="activeSlide = i">
                </button>
            </div>

            <!-- Carousel navigation buttons -->
            <button class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    type="button" @click="prevSlide">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg aria-hidden="true" class="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1 1 5l4 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"/>
          </svg>
        </span>
            </button>
            <button class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    type="button" @click="nextSlide">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg aria-hidden="true" class="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10"
               xmlns="http://www.w3.org/2000/svg">
            <path d="m1 9 4-4-4-4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"/>
          </svg>
        </span>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ images: string[], name: string }>();

const activeSlide = ref(0);

const nextSlide = () => {
    activeSlide.value = (activeSlide.value + 1) % props.images.length;
};

const prevSlide = () => {
    activeSlide.value = (activeSlide.value - 1 + props.images.length) % props.images.length;
};
</script>

<style scoped>

</style>