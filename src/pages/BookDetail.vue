<script setup>
import { useRoute } from "vue-router";
import { useBookStore } from "@/store/book";
import { computed } from "vue";
import BookForm from "@/components/BookForm.vue";

const route = useRoute();
const store = useBookStore();

const bookId = route.params.id;

const book = computed(() => {
    if (store.state?.length < 1) return null;
    return store.state.find((b) => b.id === bookId);
});
</script>

<template>
    <div class="min-h-screen bg-gray-100 py-8">
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">Деталі книги</h1>

            <template v-if="book">
                <book-form v-model="book" :read-only="true" />

                <router-link
                    to="/"
                    class="inline-block mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    На головну
                </router-link>
            </template>
            
            <div v-else class="text-center text-gray-600">
                <p>Книгу не знайдено.</p>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
</style>