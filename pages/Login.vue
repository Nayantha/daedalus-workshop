<template>
    <form class="space-y-6" @submit="onSubmit">
        <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 text-green-600 p-4 rounded-lg mb-4">
            Login successfully completed. Redirecting to home page....
        </div>

        <div>
            <label class="block text-sm font-medium leading-6 text-default-dark dark:text-default-light" for="email">
                Email address
            </label>
            <div class="mt-2">
                <input
                        id="email"
                        v-model="email"
                        :class="{ 'border-red-500': errors.email }"
                        autocomplete="email"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="email"
                        required
                        type="email"
                />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div>
            <label class="block text-sm font-medium leading-6 text-default-dark dark:text-default-light" for="password">
                Password
            </label>
            <div class="mt-2">
                <input
                        id="password"
                        v-model="password"
                        :class="{ 'border-red-500': errors.password }"
                        autocomplete="current-password"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="password"
                        required
                        type="password"
                />
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <div>
            <button
                    :disabled="loading"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
            >
                <span v-if="loading">Processing...</span>
                <span v-else>Sign in</span>
            </button>
        </div>

    </form>
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
        password: '1234567890aZ1',
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