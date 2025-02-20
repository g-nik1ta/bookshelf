<script setup>
import { useRoute } from "vue-router";
import { useBookStore } from "@/store/book";
import { computed } from "vue";
import BookForm from "@/components/BookForm.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import ToHome from "@/components/ToHome.vue";

const route = useRoute();
const store = useBookStore();

const bookId = route.params.id;

const book = computed(() => {
    if (store.state?.length < 1) return null;
    return store.state.find((b) => b.id === bookId);
});
</script>

<template>
    <page-wrapper title="Деталі книги">
        <template v-if="book">
            <book-form v-model="book" :read-only="true" />

            <to-home :primary="true" />
        </template>

        <div v-else class="text-center text-gray-600">
            <p>Книгу не знайдено.</p>
        </div>
    </page-wrapper>
</template>

<style lang='scss' scoped>
</style>