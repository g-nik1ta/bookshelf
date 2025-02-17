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
            console.log(response);
            books.value = response;
        },
        (errorResponse) => {
            console.error("Помилка при отриманні книг:", errorResponse);
        }
    );
});

</script>

<template>
    <div>
        <h1>Книжкова полиця</h1>
        <nav>
            <router-link to="/add-book">Додати книгу</router-link>
        </nav>
        <div>
            <div v-if="request.loading.value">
                <Loader w="32px" h="32px" bw="3px" />
            </div>
            <ul v-else>
                <li v-for="book in books" :key="book.id">
                    {{ book.title }} - {{ book.author }} ({{ book.year }})
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang='scss' scoped>
</style>