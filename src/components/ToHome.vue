<script setup>
defineProps({
    primary: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <router-link
        to="/"
        :class="
            primary
                ? 'inline-block mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                : 'mt-6 inline-block text-blue-500 hover:text-blue-600 transition-colors'
        "
    >
        На головну
    </router-link>
</template>

<style lang='scss' scoped>
</style>