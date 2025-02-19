<script setup>
import Loader from "@/components/UComponents/Loader.vue";
import UInput from "@/components/UComponents/UInput.vue";
import { useBookStore } from "@/store/book";
import { inject, ref } from "vue";

const toast = inject("toast");
const store = useBookStore();

const book = ref({
    title: "",
    author: "",
    year: "",
    description: "",
});

const submitForm = async () => {
    if (store.loading) return;

    await store
        .createBook(book.value)
        .then(() => {
            toast.success("Додано нову книгу!");
        })
        .catch((error = null) => {
            toast.error(error ?? "Виникла помилка!");
        });
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 py-8">
        <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
                Додати нову книгу
            </h1>

            <form @submit.prevent="submitForm" class="space-y-6">
                <u-input
                    id="title"
                    placeholder="Введіть назву книги"
                    v-model="book.title"
                    label="Назва книги"
                />
                <u-input
                    id="author"
                    placeholder="Введіть автора"
                    v-model="book.author"
                    label="Автор"
                />
                <u-input
                    id="textarea"
                    placeholder="Введіть рік видання"
                    v-model="book.year"
                    label="Рік"
                    type="number"
                />
                <u-input
                    id="description"
                    placeholder="Введіть опис книги"
                    v-model="book.description"
                    label="Опис"
                    type="textarea"
                />

                <div>
                    <button
                        type="submit"
                        class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <div v-if="store.loading">
                            <loader w="24px" h="24px" bw="3px" borderColor="#FFF" />
                        </div>
                        <span v-else>Додати книгу</span>
                    </button>
                </div>
            </form>

            <router-link
                to="/"
                class="mt-6 inline-block text-blue-500 hover:text-blue-600 transition-colors"
            >
                На головну
            </router-link>
        </div>
    </div>
</template>

<style lang='scss' scoped>
</style>