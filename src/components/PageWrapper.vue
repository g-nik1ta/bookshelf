<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <section class="min-h-screen bg-gray-100 py-8">
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
                {{ title }}
            </h1>

            <slot />
        </div>
    </section>
</template>

<style lang='scss' scoped>
</style>