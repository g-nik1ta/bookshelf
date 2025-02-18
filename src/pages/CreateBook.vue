<script setup>
import { ref } from "vue";

const book = ref({
    title: "",
    author: "",
    year: "",
    description: "",
});

const submitForm = () => {
    console.log("Додано нову книгу:", book.value);
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 py-8">
        <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
                Додати нову книгу
            </h1>

            <form @submit.prevent="submitForm" class="space-y-6">
                <div>
                    <label
                        for="title"
                        class="block text-sm font-medium text-gray-700"
                        >Назва книги</label
                    >
                    <input
                        type="text"
                        id="title"
                        v-model="book.title"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введіть назву книги"
                        required
                    />
                </div>

                <div>
                    <label
                        for="author"
                        class="block text-sm font-medium text-gray-700"
                        >Автор</label
                    >
                    <input
                        type="text"
                        id="author"
                        v-model="book.author"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введіть автора"
                        required
                    />
                </div>

                <div>
                    <label
                        for="year"
                        class="block text-sm font-medium text-gray-700"
                        >Рік видання</label
                    >
                    <input
                        type="number"
                        id="year"
                        v-model="book.year"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введіть рік видання"
                        required
                    />
                </div>

                <div>
                    <label
                        for="description"
                        class="block text-sm font-medium text-gray-700"
                        >Опис</label
                    >
                    <textarea
                        id="description"
                        v-model="book.description"
                        rows="4"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введіть опис книги"
                        required
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Додати книгу
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