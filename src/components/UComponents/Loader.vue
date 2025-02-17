<script setup>
defineProps({
    w: {
        type: String,
        default: "48px",
    },
    h: {
        type: String,
        default: "48px",
    },
    bw: {
        type: String,
        default: "5px",
    },
});
</script>

<template>
    <div class="loader_wrapper">
        <div
            class="loader"
            :style="{ width: w, height: h, borderWidth: bw }"
        ></div>
    </div>
</template>

<style lang='scss' scoped>
.loader {
    width: 48px;
    height: 48px;
    border-width: 5px;
    border-style: solid;
    border-color: #000000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>