<template>
    <header>
        <nav aria-label="Global"
             class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 dark:bg-zinc-950/50 lg:dark:bg-transparent">
            <!--LOGO-->
            <div class="flex lg:flex-1">
                <a class="-m-1.5 p-1.5" href="#">
                    <span class="sr-only">Your Company</span>
                    <img alt="" class="h-8 w-auto"
                         src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"/>
                </a>
            </div>
            <!--Mobile Menu icon-->
            <button class="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                    type="button" @click="mobileMenuOpen = true">
                <span class="sr-only">Open main menu</span>
                <Menu
                    :class="[
                    'm-auto size-6 duration-200',
                    { 'rotate-180 scale-0 opacity-0': mobileMenuOpen }
                  ]"
                />
            </button>
            <!--Nav Links-->
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
            </div>
            <!--Nav Login/SignUp + Theme Toggle-->
            <div
                class="hidden lg:flex lg:flex-1 lg:justify-end flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:pl-6">
                <Button as="router-link" class="dark:text-white" size="sm" to="/login" variant="outline">
                    Login
                </Button>
                <Button as="router-link" class="dark:text-white" size="sm" to="/register">
                    Sign Up
                </Button>
                <ThemeToggleBotton/>
            </div>
        </nav>
        <Dialog :open="mobileMenuOpen" class="lg:hidden" @close="mobileMenuOpen = false">
            <div class="fixed inset-0 z-10"/>
            <DialogPanel
                    class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <a class="-m-1.5 p-1.5" href="#">
                        <span class="sr-only">Your Company</span>
                        <img alt="" class="h-8 w-auto"
                             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"/>
                    </a>
                    <button class="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden mr-0" type="button"
                            @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <X
                            :class="[
                    'absolute inset-0 m-auto size-6 duration-200',
                    { 'rotate-0 scale-100 opacity-100': mobileMenuOpen },
                    { '-rotate-180 scale-0 opacity-0': !mobileMenuOpen }
                  ]"
                        />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <Disclosure v-slot="{ open }" as="div" class="-mx-3">
                                <DisclosureButton
                                        class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                    Product
                                    <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'size-5 flex-none']"
                                                     aria-hidden="true"/>
                                </DisclosureButton>
                                <DisclosurePanel class="mt-2 space-y-2">
                                    <DisclosureButton v-for="item in [...products, ...callsToAction]" :key="item.name"
                                                      :href="item.href" as="a"
                                                      class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">
                                        {{ item.name }}
                                    </DisclosureButton>
                                </DisclosurePanel>
                            </Disclosure>
                            <a class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                               href="#">Features</a>
                            <a class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                               href="#">Marketplace</a>
                            <a class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                               href="#">Company</a>
                        </div>
                        <div class="py-6">
                            <a class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                               href="/login">Log in</a>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/vue'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import { Menu, X } from "lucide-vue-next";

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const mobileMenuOpen = ref(false)
</script>