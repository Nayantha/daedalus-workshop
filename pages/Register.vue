<template>
    <div
        class="flex w-full mt-4 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div class="hidden bg-cover lg:block lg:w-1/2"
             style="background-image: url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80');">
        </div>
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p class="mt-3 text-xl text-center dark:text-white">
                Welcome!
            </p>
            <OAuthAuthentication/>
            <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                <div class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">or
                    register
                    with email
                </div>
                <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>
            <form class="space-y-6" @submit="onSubmit">
                <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                    {{ error }}
                </div>

                <div v-if="success" class="bg-green-50 text-green-600 p-4 rounded-lg mb-4">
                    Registering successfully completed. Redirecting to home page....
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

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                        Name
                    </label>
                    <input
                        id="name"
                        v-model="name"
                        :class="{ 'border-red-500': errors.name }"
                        autocomplete="name"
                        class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                        name="name"
                        required
                        type="text"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
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

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                           for="confirmPassword">
                        Re-type Password
                    </label>
                    <input
                        id="confirmPassword"
                        v-model="confirmPassword"
                        :class="{ 'border-red-500': errors.confirmPassword }"
                        autocomplete="current-password"
                        class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                        name="confirmPassword"
                        required
                        type="password"
                    />
                    <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="avatar">
                        Profile Picture
                    </label>
                    <div class="mt-2">
                        <input
                            id="avatar"
                            ref="avatarInput"
                            accept="image/*"
                            class="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-grey-50 file:text-grey-600 hover:file:bg-grey-100"
                            required
                            type="file"
                            @change="handleAvatarChange"
                        />
                    </div>
                    <div v-if="avatarPreview" class="mt-2">
                        <img :src="avatarPreview" alt="Avatar preview"
                             class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"/>
                    </div>
                    <p v-if="errors.avatar" class="mt-1 text-sm text-red-600">{{ errors.avatar }}</p>

                </div>

                <div class="mt-4">
                    <button
                        :disabled="loading"
                        class="flex w-full justify-center rounded-md transition-colors duration-300 transform bg-gray-800 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                    >
                        <span v-if="loading">Processing...</span>
                        <span v-else>Register</span>
                    </button>
                </div>

            </form>
            <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                <a class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline" href="/login">or
                    sign in</a>

                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import type { RegisterDTO } from "~/types/User";

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    avatar: yup.mixed()
        .required('Avatar required')
        .test('fileSize', 'File too large (max 2MB)', value =>
            value ? value.size <= 2000000 : true
        )
        .test('fileType', 'Invalid file type', value =>
            value ? ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/avif'].includes(value.type) : true
        ),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
    confirmPassword: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match')
});

const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        email: 'mail@mail.com',
        password: '1234567890aZ',
        confirmPassword: '1234567890aZ',
        name: 'my name',
        avatar: ''
    }
});

const loading = ref(false);
const success = ref(false);
const error = ref('');
const avatarPreview = ref();
const avatarFile = ref();

const { value: email } = useField('email');
const { value: name } = useField('name');
const { value: confirmPassword } = useField('confirmPassword');
const { value: password } = useField('password');

const handleAvatarChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
        const file = input?.files[0];
        avatarFile.value = file;

        // Convert file to base64 for JSON payload
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarPreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

const onSubmit = handleSubmit(async (values: RegisterDTO) => {
    try {
        loading.value = true
        error.value = ''

        if (avatarFile.value) {
            const reader = new FileReader();
            values.avatar = await new Promise((resolve) => {
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(avatarFile.value!);
            });
        }

        await $fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });

        success.value = true;
        resetForm()
        await navigateTo('/');
    } catch (err: any) {
        console.error(err);
        error.value = err.message;
        if (err.response && err.response.status === 409) {
            error.value = 'An account with this email already exists';
        } else {
            error.value = err.data?.message || 'Registration failed';
        }
    } finally {
        loading.value = false
    }
})

useHead({
    title: "Register Page"
})
</script>