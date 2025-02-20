<script setup>
defineProps({
    id: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: "",
    },
    required: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        default: "text",
    },
    label: {
        type: String,
        default: "",
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: null,
    },
});

const value = defineModel({
    type: [String, null, Number],
});
</script>

<template>
    <div>
        <label
            v-if="label"
            :for="id"
            class="block text-sm font-medium text-gray-700"
        >
            {{ label }}
        </label>
        <p v-if="readOnly" class="mt-1 text-lg text-gray-900">{{ value }}</p>
        <textarea
            v-else-if="type === 'textarea'"
            :id="id"
            v-model="value"
            rows="4"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            :placeholder="placeholder"
            :required="required"
        ></textarea>
        <input
            v-else
            :type="type"
            :id="id"
            v-model="value"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            :placeholder="placeholder"
            :required="required"
        />
        <span v-if="error" class="px-2 text-red-500 text-xs font-medium">
            {{error}}
        </span>
    </div>
</template>

<style lang='scss' scoped>
</style>