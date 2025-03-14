<template>
    <section class="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900">

        <form
            class="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:border-zinc-700 dark:[--color-muted:var(--color-zinc-800)]"
            @submit="onSubmit"
        >

            <div class="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6 dark:border-zinc-700">
                <div class="text-center">
                    <router-link
                        aria-label="go home"
                        class="mx-auto block w-fit"
                        to="/"
                    >
                        <Logo class="text-zinc-900 dark:text-white"/>
                    </router-link>
                    <h1 class="mb-1 mt-4 text-xl font-semibold dark:text-white">Sign In to Daedalus' Workshop</h1>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400">Welcome back! Sign in to continue</p>
                </div>

                <OAuthAuthentication/>

                <div class="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <hr class="border-dashed dark:border-zinc-700"/>
                    <span class="text-muted-foreground text-xs dark:text-zinc-400">Or continue With</span>
                    <hr class="border-dashed dark:border-zinc-700"/>
                </div>

                <div class="mt-6 space-y-6">
                    <div class="space-y-2">
                        <Label class="block text-sm dark:text-zinc-300" for="email">
                            Email
                        </Label>
                        <input
                            id="email"
                            v-model="email"
                            :class="{ 'border-red-500': errors.email }"
                            autocomplete="email"
                            class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                            name="email"
                            required
                            type="email"
                        />
                        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                    </div>

                    <div class="space-y-0.5">
                        <div class="flex items-center justify-between">
                            <Label class="text-title text-sm dark:text-zinc-300" for="password">
                                Password
                            </Label>
                        </div>
                        <input
                            id="password"
                            v-model="password"
                            :class="{ 'border-red-500': errors.password }"
                            autocomplete="current-password"
                            class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                            name="password"
                            required
                            type="password"
                        />
                        <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
                    </div>

                    <button
                        :disabled="loading"
                        class="flex w-full justify-center rounded-md transition-colors duration-300 transform bg-gray-800 px-6 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-black dark:bg-indigo-600 dark:hover:bg-indigo-700"
                        type="submit"
                    >
                        <span v-if="loading">Processing...</span>
                        <span v-else>Sign in</span>
                    </button>
                </div>

            </div>

            <div class="p-3 border-t dark:border-zinc-700">
                <p class="text-accent-foreground text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Don't have an account ?
                    <Button class="px-2" type="submit" variant="link">
                        <router-link
                            class="text-indigo-600 dark:text-indigo-400 hover:underline"
                            to="/register"
                        >
                            Create account
                        </router-link>
                    </Button>
                </p>
            </div>
        </form>
    </section>
</template>

<script lang="ts" setup>
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";

const schema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
});

const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        email: 'mail@mail.com',
        password: '1234567890aZ',
    }
});

const loading = ref(false);
const success = ref(false);
const error = ref('');

const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(async (values) => {

    try {
        loading.value = true;
        error.value = '';

        await $fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });

        success.value = true;
        resetForm();
        await navigateTo('/');
    } catch (err: any) {
        error.value = err.message;
        if (err.response && err.response.status === 409) {
            error.value = 'An account with this email already exists';
        } else {
            error.value = err.data?.message || 'Registration failed';
        }
    } finally {
        loading.value = false;
    }
})

useHead({
    title: "Login Page"
})
</script>

<style scoped>

</style>