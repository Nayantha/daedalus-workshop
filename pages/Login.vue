<template>
    <div v-if="loggedIn">
        <h1>Welcome {{ user.login }}!</h1>
        <p>Logged in since {{ session.loggedInAt }}</p>
        <button @click="clear">Logout</button>
    </div>
    <div v-else>
        <h1>Not logged in</h1>
        <a href="/auth/github">Login with GitHub</a>
        <button @click="openInPopup('/auth/github')">Login with GitHub</button>
    </div>
</template>

<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

useHead({
    title: "Login Page"
})
</script>

<style scoped>

</style>