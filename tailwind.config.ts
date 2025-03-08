/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        `components/**/*.{vue,ts}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `composables/**/*.{js,ts}`,
        `plugins/**/*.{js,ts}`,
        `app.vue`
    ],
    darkMode: 'class',
}
