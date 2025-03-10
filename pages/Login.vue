<template>
    <div
        class="flex w-full mt-4 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div class="hidden bg-cover lg:block lg:w-1/2"
             style="background-image: url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80');">
        </div>
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p class="mt-3 text-xl text-center dark:text-white">
                Welcome back!
            </p>
            <OAuthAuthentication/>
            <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <div class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">or
                    login
                    with email
                </div>

                <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>
            <form class="space-y-6" @submit="onSubmit">
                <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mt-4">
                    {{ error }}
                </div>

                <div v-if="success" class="bg-green-50 text-green-600 p-4 rounded-lg mt-4">
                    Login successfully completed. Redirecting to home page....
                </div>

                <div class="mt-4">
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="email">
                        Email address
                    </label>
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

                <div class="mt-4">
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                           for="password">
                        Password
                    </label>
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

                <div class="mt-4">
                    <button
                        :disabled="loading"
                        class="flex w-full justify-center rounded-md transition-colors duration-300 transform bg-gray-800 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                    >
                        <span v-if="loading">Processing...</span>
                        <span v-else>Sign in</span>
                    </button>
                </div>
            </form>
            <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                <a class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline" href="/register">or
                    register</a>

                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
        </div>
    </div>
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
        loading.value = true
        error.value = ''

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })

        if (!response.ok) {
            const data = await response.json();

            error.value = data.message || 'Login failed';

            if (response.status === 409) {
                error.value = 'Wrong password.';
            }
            return;
        }
        // const data = await response.json();
        success.value = true;
        resetForm()
        // await navigateTo('/');
    } catch (err: any) {
        error.value = err.message
    } finally {
        loading.value = false
    }
})

useHead({
    title: "Login Page"
})
</script>

<style scoped>

</style>