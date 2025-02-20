<script setup>
import BookForm from "@/components/BookForm.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import ToHome from "@/components/ToHome.vue";
import Loader from "@/components/UComponents/Loader.vue";
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
            book.value = {
                title: "",
                author: "",
                year: "",
                description: "",
            };
        })
        .catch((error = null) => {
            toast.error(error ?? "Виникла помилка!");
        });
};
</script>

<template>
    <page-wrapper title="Додати нову книгу">
        <form @submit.prevent="submitForm" class="space-y-6">
            <book-form v-if="book" v-model="book" />

            <button
                type="submit"
                class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                <div v-if="store.loading">
                    <loader w="24px" h="24px" bw="3px" borderColor="#FFF" />
                </div>
                <span v-else>Додати книгу</span>
            </button>
        </form>

        <to-home />
    </page-wrapper>
</template>

<style lang='scss' scoped>
</style>