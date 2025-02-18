<script setup>
import NavBar from "./components/NavBar.vue";
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