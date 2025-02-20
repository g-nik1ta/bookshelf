<script setup>
import { useRoute } from "vue-router";
import { useBookStore } from "@/store/book";
import BookForm from "@/components/BookForm.vue";
import { inject, ref, watch } from "vue";

const route = useRoute();
const toast = inject("toast");
const store = useBookStore();
const bookId = route.params.id;

const book = ref(null);

const submitForm = async () => {
    if (store.loading) return;
    
    await store
        .updateBook(book.value)
        .then(() => {
            toast.success("Книга оновлена!");
        })
        .catch((error = null) => {
            toast.error(error ?? "Виникла помилка!");
        });
};

watch(
    () => store.state,
    () => {
        if (store.state?.length > 0) {
            book.value = store.state.find((b) => b.id === bookId);
        }
    },
);
</script>

<template>
    <div class="min-h-screen bg-gray-100 py-8">
        <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
                Оновити дані про книгу
            </h1>

            <form @submit.prevent="submitForm" class="space-y-6">
                <book-form v-if="book" v-model="book" />

                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <div v-if="store.loading">
                        <loader w="24px" h="24px" bw="3px" borderColor="#FFF" />
                    </div>
                    <span v-else>Оновити</span>
                </button>
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