<script setup>
import BookItem from "@/components/BookItem.vue";
import Loader from "@/components/UComponents/Loader.vue";
import SearchBox from "@/components/UComponents/SearchBox.vue";
import { useBookStore } from "@/store/book";
import { computed, ref } from "vue";

const store = useBookStore();

const searchValue = ref();
const searchKeys = ['title', 'author', 'year']

const books = computed(() => {
    const searchQuery = searchValue.value?.trim().toLowerCase();
    if (!searchQuery) return store.state
    
    return store.state.filter((item) => {
        return searchKeys.some((key) => {
            if (item[key]) {
                return String(item[key]).toLowerCase().includes(searchQuery);
            }
            return false;
        });
    });
});
</script>

<template>
    <section class="p-6 bg-gray-300 grow">
        <h1 class="text-3xl font-bold text-center text-blue-800 mb-6">
            Книжкова полиця
        </h1>
        <div class="text-center mb-8">
            <router-link
                to="/add-book"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Додати книгу
            </router-link>
        </div>
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <search-box class="mb-6" v-model="searchValue" />
            <div
                v-if="store.loading"
                class="flex justify-center items-center h-32"
            >
                <loader w="32px" h="32px" bw="3px" />
            </div>
            <ul v-else class="space-y-4">
                <book-item
                    v-for="book in books"
                    :key="book.id"
                    :book="book"
                />
            </ul>
        </div>
    </section>
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