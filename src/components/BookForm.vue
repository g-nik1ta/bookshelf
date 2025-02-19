<script setup>
import UInput from "@/components/UComponents/UInput.vue";

defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
});

const book = defineModel({
    type: [Object, null],
});
</script>

<template>
    <div class="space-y-6">
        <u-input
            id="title"
            placeholder="Введіть назву книги"
            v-model="book.title"
            label="Назва книги"
            :read-only="readOnly"
        />
        <u-input
            id="author"
            placeholder="Введіть автора"
            v-model="book.author"
            label="Автор"
            :read-only="readOnly"
        />
        <u-input
            id="textarea"
            placeholder="Введіть рік видання"
            v-model="book.year"
            label="Рік видання"
            type="number"
            :read-only="readOnly"
        />
        <u-input
            id="description"
            placeholder="Введіть опис книги"
            v-model="book.description"
            label="Опис"
            type="textarea"
            :read-only="readOnly"
        />
    </div>
</template>

<style lang='scss' scoped>
</style>