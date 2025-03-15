<template>
    <header>
        <nav :class="[
              'fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-black',
              { 'active': mobileMenuOpen }
            ]"
        >
            <div class="m-auto max-w-5xl px-6">
                <div class="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                    <div class="flex w-full justify-between lg:w-auto">
                        <!--logo-->
                        <router-link
                            aria-label="home"
                            class="flex items-center space-x-2"
                            to="/"
                        >
                            <Logo class="text-zinc-900 dark:text-white"/>
                        </router-link>
                        <!--mobile menu icon-->
                        <button
                            aria-label="Toggle Menu"
                            class="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            @click="mobileMenuOpen = !mobileMenuOpen"
                        >
                            <Menu
                                :class="[
                        'm-auto size-6 duration-200',
                        { 'rotate-180 scale-0 opacity-0': mobileMenuOpen }
                      ]"
                            />
                            <X
                                :class="[
                        'absolute inset-0 m-auto size-6 duration-200',
                        { 'rotate-0 scale-100 opacity-100': mobileMenuOpen },
                        { '-rotate-180 scale-0 opacity-0': !mobileMenuOpen }
                      ]"
                            />
                        </button>
                    </div>
                    <!--nav links-->
                    <div
                        :class="[
                    'bg-white dark:bg-zinc-900 lg:dark:bg-transparent',
                    'mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none',
                    { 'block lg:flex': mobileMenuOpen }
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
                            <Button as="router-link" class="dark:text-white" size="sm" to="/register">
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

const mobileMenuOpen = ref(false)
</script>