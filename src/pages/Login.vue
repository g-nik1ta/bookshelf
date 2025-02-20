<script setup>
import PageWrapper from "@/components/PageWrapper.vue";
import Loader from "@/components/UComponents/Loader.vue";
import UInput from "@/components/UComponents/UInput.vue";
import { useAuthStore } from "@/store/user";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = inject('toast')
const store = useAuthStore()

const form = ref({
    username: '',
    password: '',
})
const errors = ref({});

const handleLogin = async () => {
    errors.value = {};
    if (!form.value.username.trim()) {
        errors.value.username = "Поле Ім'я обов'язкове";
        return;
    }
    if (!form.value.password.trim()) {
        errors.value.password = "Поле Пароль обов'язкове";
        return;
    }

    await store
        .signIn(form.value.username, form.value.password)
        .then(() => {
            toast.success("Ви успішно авторизувалися!");
            form.value = {
                username: "",
                password: "",
            };
            router.push("/");
        })
        .catch((error = null) => {
            toast.error(error ?? "Виникла помилка!");
        });
};
</script>

<template>
    <page-wrapper :auth="true" title="Вхід">
        <form @submit.prevent="handleLogin" class="space-y-6">
            <u-input
                id="username"
                placeholder="Введіть ваше ім'я"
                :required="true"
                label="Ім'я"
                v-model="form.username"
            />

            <u-input
                id="password"
                placeholder="Введіть ваш пароль"
                :required="true"
                label="Пароль"
                v-model="form.password"
                type="password"
            />

            <button
                type="submit"
                class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                <div v-if="store.loading">
                    <loader w="24px" h="24px" bw="3px" borderColor="#FFF" />
                </div>
                <span v-else>Увійти</span>
            </button>

            <p class="text-center text-gray-600">
                Ще не зареєстровані?
                <router-link
                    to="/register"
                    class="text-blue-500 hover:text-blue-600"
                >
                    Зареєструватися
                </router-link>
            </p>
        </form>
    </page-wrapper>
</template>

<style lang='scss' scoped>
.form-input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
</style>