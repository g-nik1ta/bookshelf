<script setup>
import NavBar from "./components/NavBar.vue";
import { onMounted } from "vue";
import { useBookStore } from "@/store/book";

const store = useBookStore();

onMounted(async () => {
    await store.getBooks();
});
</script>

<template>
    <div class="main_layout">
        <NavBar />
        <router-view />
    </div>
</template>

<style lang='scss' scoped>
.main_layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>