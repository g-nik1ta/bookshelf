<script setup>
import NavBar from "./components/NavBar.vue";
import { inject, onMounted } from "vue";
import { useBookStore } from "@/store/book";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./store/user";

const toast = inject("toast");
const store = useBookStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
    await authStore.login().catch((error = null) => {
        toast.error(error ?? "Виникла помилка!");
        router.push("/login");
    });

    if (authStore.isAuthenticated) {
        await store.getBooks();
    }
});
</script>

<template>
    <main class="main_layout">
        <NavBar v-if="!!route?.meta?.requiresAuth" />
        <router-view />
    </main>
</template>

<style lang='scss' scoped>
.main_layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>