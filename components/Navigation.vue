<template>
    <header>
        <nav :class="[
              'fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-black',
              { 'active': isMobileMenuOpen }
            ]"
        >
            <div class="m-auto max-w-5xl px-6">
                <div class="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                    <div class="flex w-full justify-between lg:w-auto">

                        <!-- Logo -->
                        <router-link
                            aria-label="home"
                            class="flex items-center space-x-2"
                            to="/"
                        >
                            <Logo class="text-zinc-900 dark:text-white"/>
                        </router-link>

                        <!-- Mobile Menu Toggle Button -->
                        <Button
                            :aria-label="isMobileMenuOpen ? 'Close Menu' : 'Open Menu'"
                            class="lg:hidden dark:text-white dark:shadow-transparent"
                            variant="ghost"
                            @click="toggleMenu"
                        >
                            <Menu
                                :class="[
                        'm-auto size-6 duration-200 dark:text-white',
                        { 'rotate-180 scale-0 opacity-0': isMobileMenuOpen }
                      ]"
                            />
                            <X
                                :class="[
                        'absolute m-auto size-6 duration-200',
                        { 'rotate-0 scale-100 opacity-100': isMobileMenuOpen },
                        { '-rotate-180 scale-0 opacity-0': !isMobileMenuOpen }
                      ]"
                            />
                        </Button>
                    </div>
                    <!--nav links-->
                    <div
                        :class="[
                    'bg-white dark:bg-zinc-900 lg:dark:bg-transparent',
                    'mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none',
                    { 'block lg:flex': isMobileMenuOpen },
                    { 'hidden': !isMobileMenuOpen },
                    'lg:flex'
                  ]"
                    >
                        <div class="lg:pr-4">
                            <ul class="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                <li v-for="(item, index) in products" :key="index">
                                    <router-link
                                        :to="item.href"
                                        class="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 block duration-150"
                                    >
                                        {{ item.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>

                        <div
                            class="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                            <Button as="router-link" class="dark:text-white" size="sm" to="/login" variant="outline">
                                Login
                            </Button>
                            <Button as="router-link" class="dark:text-white dark:shadow-slate-600" size="sm"
                                    to="/register">
                                Sign Up
                            </Button>
                            <ThemeToggleBotton/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, X } from "lucide-vue-next";

const products = [
    { name: 'Analytics', href: '#' },
    { name: 'Engagement', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Integrations', href: '#' },
    { name: 'Automations', href: '#' },
]

const isMobileMenuOpen = ref(false);

const handleClickOutside = (event) => {
    const nav = document.querySelector('nav');
    if (isMobileMenuOpen.value && nav && !nav.contains(event.target)) {
        isMobileMenuOpen.value = false;
    }
};

// Close mobile menu when window resizes to desktop size
const handleResize = () => {
    if (window.innerWidth >= 1024 && isMobileMenuOpen.value) {
        isMobileMenuOpen.value = false;
    }
};

const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

const closeMenu = () => {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', handleResize);
    document.body.style.overflow = ''; // Reset overflow when component unmounts
});

</script>