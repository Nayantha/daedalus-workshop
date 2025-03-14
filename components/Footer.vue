<template>
    <footer class="py-16 md:py-32 bg-white dark:bg-zinc-900">
        <div class="mx-auto max-w-5xl px-6">
            <router-link aria-label="go home" class="mx-auto block size-fit" to="/">
                <Logo class="text-zinc-900 dark:text-white"/>
            </router-link>

            <div class="my-8 flex flex-wrap justify-center gap-6 text-sm">
                <router-link
                        v-for="(link, index) in links"
                        :key="index"
                        :to="link.href"
                        class="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 block duration-150 transition-colors"
                >
                    <span>{{ link.title }}</span>
                </router-link>
            </div>

            <div class="my-8 flex flex-wrap justify-center gap-6 text-sm">
                <router-link
                        v-for="(social, index) in socialLinks"
                        :key="index"
                        :aria-label="social.label"
                        :to="social.href"
                        class="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 block transition-colors"
                        rel="noopener noreferrer"
                        target="_blank"
                >
                    <component :is="social.icon" class="size-6"/>
                </router-link>
            </div>

            <span class="text-zinc-600 dark:text-zinc-400 block text-center text-sm"> © {{ new Date().getFullYear() }} Nayantha Yasiru Koralegama, All rights reserved</span>
        </div>
    </footer>
</template>

<script setup>

const links = [
    {
        title: 'Features',
        href: '#',
    },
    {
        title: 'Solution',
        href: '#',
    },
    {
        title: 'Customers',
        href: '#',
    },
    {
        title: 'Pricing',
        href: '#',
    },
    {
        title: 'Help',
        href: '#',
    },
    {
        title: 'About',
        href: '#',
    }
]

const socialLinks = [
    {
        label: 'X/Twitter',
        href: '#',
        icon: defineAsyncComponent(() => import('@/components/icons/XIcon.vue'))
    },
    {
        label: 'LinkedIn',
        href: '#',
        icon: defineAsyncComponent(() => import('@/components/icons/LinkedInIcon.vue'))
    },
    {
        label: 'Facebook',
        href: '#',
        icon: defineAsyncComponent(() => import('@/components/icons/FacebookIcon.vue'))
    },
    {
        label: 'Threads',
        href: '#',
        icon: defineAsyncComponent(() => import('@/components/icons/ThreadsIcon.vue'))
    },
    {
        label: 'Instagram',
        href: '#',
        icon: defineAsyncComponent(() => import('@/components/icons/InstagramIcon.vue'))
    },
    {
        label: 'TikTok',
        href: '#',
        icon: defineAsyncComponent(() => import('@/components/icons/TikTokIcon.vue'))
    }
]
</script>

<style scoped>

</style>