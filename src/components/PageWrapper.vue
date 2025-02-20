<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    auth: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <section
        class="min-h-screen bg-gray-100"
        :class="auth ? 'flex items-center justify-center' : 'py-8'"
    >
        <div
            class="bg-white p-8 rounded-lg shadow-lg"
            :class="auth ? 'w-full max-w-md' : 'max-w-4xl mx-auto'"
        >
            <h1
                class="text-3xl font-bold text-gray-800 mb-6"
                :class="{ 'text-center': auth }"
            >
                {{ title }}
            </h1>

            <slot />
        </div>
    </section>
</template>

<style lang='scss' scoped>
</style>