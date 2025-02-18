<script setup>
import { ref, onMounted } from "vue";
import useRequest from "@/composable/useRequest";
import Loader from "@/components/UComponents/Loader.vue";

const request = useRequest();
const books = ref([]);

onMounted(async () => {
    await request.get(
        "http://localhost:3000/books",
        [],
        (response) => {
            books.value = response;
        },
        (errorResponse) => {
            console.error("Помилка при отриманні книг:", errorResponse);
        }
    );
});
</script>

<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <h1 class="text-3xl font-bold text-center text-blue-800 mb-6">
            Книжкова полиця
        </h1>
        <nav class="text-center mb-8">
            <router-link
                to="/add-book"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Додати книгу
            </router-link>
        </nav>
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div
                v-if="request.loading.value"
                class="flex justify-center items-center h-32"
            >
                <Loader w="32px" h="32px" bw="3px" />
            </div>
            <ul v-else class="space-y-4">
                <li
                    v-for="book in books"
                    :key="book.id"
                    class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <h2 class="text-xl font-semibold text-gray-800">
                        {{ book.title }}
                    </h2>
                    <p class="text-gray-600">
                        {{ book.author }} ({{ book.year }})
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang='scss' scoped>
ul {
    list-style-type: none;
    padding: 0;

    li {
        border-left: 4px solid #3b82f6;
        padding-left: 1rem;
    }
}
</style>