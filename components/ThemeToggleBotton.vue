<template>
    <div>
        <button aria-label="Color Mode"
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent bg-black dark:bg-white mt-4 lg:mt-0"
                @click="changeColor">
            <ColorScheme placeholder="...">
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