<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
    <div>
        <NavBar />
        <div class="p-6 bg-blue-500 text-white">
            <h1 class="text-2xl font-bold">Тест Tailwind CSS</h1>
            <p class="mt-2">
                Если этот текст белый на синем фоне, Tailwind работает!
            </p>
        </div>
        <router-view />
    </div>
</template>

<style lang='scss' scoped>
</style>