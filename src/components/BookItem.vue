<script setup>
import { inject, ref } from "vue";
import ActionButton from "./ActionButton.vue";
import { useBookStore } from "@/store/book";

defineProps({
    book: {
        type: Object,
        required: true,
    },
});

const toast = inject("toast");
const store = useBookStore()
const remove = ref(false);

const removeBook = () => {
    remove.value = !remove.value;
};

const confirmRemove = async (item) => {
    await store.deleteBook(item.id)
        .then((response) => {
            toast.success(`Книгу "${response.data.title}" видалено!`);
        })
        .catch((error = null) => {
            toast.error(error ?? "Виникла помилка!");
        });
}
</script>

<template>
    <li
        class="relative p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
        <h2 class="text-xl font-semibold text-gray-800">
            {{ book.title }}
        </h2>
        <p class="text-gray-600">{{ book.author }} ({{ book.year }})</p>
        <div class="actions">
            <action-button v-if="!remove" icon="dots-horizontal" />
            <action-button v-if="!remove" icon="pencil-outline" />
            <action-button
                v-if="!remove"
                @click="removeBook"
                icon="trash-can-outline"
            />
            <template v-else>
                <action-button @click="confirmRemove(book)" icon="check" />
                <action-button @click="removeBook" icon="cancel" />
            </template>
        </div>
    </li>
</template>

<style lang='scss' scoped>
.actions {
    position: absolute;
    right: 8px;
    top: 8px;
    display: flex;
    gap: 4px;
}
</style>