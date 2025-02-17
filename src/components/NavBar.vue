<script setup>
</script>

<template>
    <nav>
        <router-link to="/">Головна</router-link> |
        <router-link to="/add-book">Додати книгу</router-link>
    </nav>
</template>

<style lang='scss' scoped>
nav {
    padding: 1rem;
    background-color: #f0f0f0;
}
nav a {
    margin: 0 0.5rem;
    text-decoration: none;
    color: #333;
}
nav a.router-link-exact-active {
    color: #42b983;
    font-weight: bold;
}
</style>