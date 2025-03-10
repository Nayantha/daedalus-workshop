<template>
    <div>
        <button :class="colorMode.value === 'dark'
                ? 'bg-stone-200 border-stone-200 text-stone-800 hover:bg-stone-100 hover:border-stone-100'
                : 'bg-stone-800 border-stone-800 text-stone-50 hover:bg-stone-700 hover:border-stone-700'"
                aria-label="Color Mode"
                class="transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] rounded-md shadow-sm hover:shadow-md flex items-center justify-center"
                @click="changeColor">
            <ColorScheme>
                <Icon v-if="colorMode.value === 'dark'" class="text-xl text-black" name="heroicons-outline:moon"/>
                <Icon v-else class="text-xl" name="heroicons-outline:sun"/>
            </ColorScheme>
        </button>
    </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const changeColor = () => (colorMode.preference = (colorMode.value === 'light' ? 'dark' : 'light'))
</script>

<style scoped>
</style>