<template>
    <div>
        Filter Menu
    </div>
    <a v-for="(tag, i) in TAGS"
       :key="i"
       :data-dui-tab-target="`tab${i}-group`"
       :href="`?tag=${tag.toLowerCase()}`"
       class="text-sm active inline-block py-2 px-4 text-stone-800 transition-all duration-300 relative z-1 mr-1">
        {{ tag.toLowerCase() }}
    </a>
</template>

<script lang="ts" setup>
import { TagType } from '@prisma/client';

const TAGS = Object.values(TagType || {});

console.log(TagType, TAGS);
</script>
<style scoped>

</style>