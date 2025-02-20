<script setup>
const value = defineModel()

const clearSearch  = () => {
    value.value = ''
};
</script>

<template>
    <div class="relative">
        <input
            type="text"
            v-model="value"
            placeholder="Пошук..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />

        <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
            <i class="mdi mdi-magnify text-gray-400"></i>
        </div>

        <button
            v-if="value"
            @click="clearSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
            <i class="mdi mdi-close"></i>
        </button>
    </div>
</template>

<style lang='scss' scoped>
</style>