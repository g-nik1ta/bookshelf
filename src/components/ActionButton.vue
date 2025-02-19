<script setup>
defineProps({
    icon: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="action_button_wrapper bg-gray-200 hover:bg-gray-300 transition-colors">
        <i class="mdi" :class="'mdi-' + icon"></i>
    </div>
</template>

<style lang='scss' scoped>
.action_button_wrapper {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    i {
        font-size: 16px;
    }
}
</style>