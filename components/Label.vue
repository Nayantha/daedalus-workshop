<template>
    <label
            :class="[
      'text-sm font-medium leading-none select-none',
      'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className
    ]"
            v-bind="$attrs"
    >
        <slot/>
    </label>
</template>

<script lang="ts" setup>
defineProps<{
    className?: string
}>();
</script>