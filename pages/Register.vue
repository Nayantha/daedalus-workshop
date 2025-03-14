<template>
    <section class="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900">
        <form
            class="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:border-zinc-700 dark:[--color-muted:var(--color-zinc-800)]"
            @submit="onSubmit">
            <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mt-4">
                {{ error }}
            </div>

            <div v-if="success" class="bg-green-50 text-green-600 p-4 rounded-lg mt-4">
                Registering successfully completed. Redirecting to home page....
            </div>

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

                    <div class="space-y-2">
                        <Label class="block text-sm dark:text-zinc-300" for="name">
                            Name
                        </Label>
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

                    <div class="space-y-2">
                        <Label class="block text-sm dark:text-zinc-300" for="password">
                            Password
                        </Label>
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

                    <div class="space-y-2">
                        <Label class="block text-sm dark:text-zinc-300"
                               for="confirmPassword">
                            Re-type Password
                        </Label>
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
                        <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{
                                errors.confirmPassword
                            }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label class="block text-sm dark:text-zinc-300" for="avatar">
                            Profile Picture
                        </Label>
                        <input
                            id="avatar"
                            ref="avatarInput"
                            accept="image/*"
                            class="block w-full text-sm text-gray-900 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-grey-50 file:text-grey-600 hover:file:bg-grey-100 dark:file:text-grey-400 dark:file:bg-grey-800 dark:file:hover:bg-grey-700 cursor-pointer"
                            required
                            type="file"
                            @change="handleAvatarChange"
                        />
                        <div v-if="avatarPreview" class="mt-2">
                            <img :src="avatarPreview" alt="Avatar preview"
                                 class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"/>
                        </div>
                        <p v-if="errors.avatar" class="mt-1 text-sm text-red-600">{{ errors.avatar }}</p>
                    </div>

                    <button
                        :disabled="loading"
                        class="flex w-full justify-center rounded-md transition-colors duration-300 transform bg-gray-800 px-6 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white dark:bg-indigo-600 dark:hover:bg-indigo-700"
                        type="submit"
                    >
                        <span v-if="loading">Processing...</span>
                        <span v-else>Register</span>
                    </button>
                </div>
            </div>

            <div class="p-3 border-t dark:border-zinc-700">
                <p class="text-accent-foreground text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Already have an account ?
                    <Button class="px-2" type="submit" variant="link">
                        <router-link
                            class="text-indigo-600 dark:text-indigo-400 hover:underline"
                            to="/login"
                        >
                            Sign In
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