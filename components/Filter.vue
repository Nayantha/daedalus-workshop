<template>
    <div>
        <div v-if="error">{{ error.message }}</div>
    </div>
</template>

<script lang="ts" setup>
const { data, error } = await useFetch(("/api/tags"));

const tags = ref(data.value?.tags || {});

</script>
<style scoped>

</style>