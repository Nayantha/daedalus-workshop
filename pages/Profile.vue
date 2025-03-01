<template>
<header>
    <template v-if="loggedIn">
        <p>Greetings, {{user?.username}}</p>
        <button @click="logout"></button>
    </template>
    <p v-else>Guest</p>
</header>
</template>

<script lang="ts" setup>
const {loggedIn, user, clear} = useUserSession();

const logout = () => {
  clear();
}

useHead({
    title: "User profile"
})
</script>

<style scoped>

</style>