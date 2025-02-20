<script setup>
import { useRoute } from "vue-router";
import { useBookStore } from "@/store/book";
import BookForm from "@/components/BookForm.vue";
import { inject, ref, watch } from "vue";
import PageWrapper from "@/components/PageWrapper.vue";
import ToHome from "@/components/ToHome.vue";

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
    { immediate: true }
);
</script>

<template>
    <page-wrapper title="Оновити дані про книгу">
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

        <to-home />
    </page-wrapper>
</template>

<style lang='scss' scoped>
</style>