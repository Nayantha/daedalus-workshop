<template>
    <component
            :is="asChild ? 'slot' : as || 'button'"
            :class="[
      'inline-flex items-center justify-center gap-2 whitespace-nowrap',
      'rounded-md text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none',
      '[&_svg]:size-4 [&_svg]:shrink-0',
      variantClasses,
      sizeClasses,
      className
    ]"
            v-bind="$attrs"
    >
        <slot/>
    </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
    as?: string
    asChild?: boolean
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    className?: string
}>()

const variantClasses = computed(() => {
    const variants = {
        default: 'bg-primary text-primary-foreground border border-primary shadow-md hover:brightness-125 dark:border-0 dark:from-primary dark:to-primary/70 dark:hover:to-primary',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-zinc-300 shadow-xs bg-background hover:bg-muted dark:border-zinc-700 dark:hover:bg-zinc-800',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
    }
    return variants[props.variant || 'default']
})

const sizeClasses = computed(() => {
    const sizes = {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9'
    }
    return sizes[props.size || 'default']
})
</script>