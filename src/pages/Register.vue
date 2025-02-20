<script setup>
import PageWrapper from "@/components/PageWrapper.vue";
import Loader from "@/components/UComponents/Loader.vue";
import UInput from "@/components/UComponents/UInput.vue";
import { useAuthStore } from "@/store/user";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = inject("toast");
const store = useAuthStore();

const form = ref({
    username: "",
    password: "",
    confirmPassword: "",
});

const errors = ref({});

const handleRegister = async () => {
    errors.value = {};
    if (!form.value.username.trim()) {
        errors.value.username = "Поле Ім'я обов'язкове";
        return;
    }
    if (form.value.password.length < 8) {
        errors.value.password = "Мінімальна довжина паролю - 8 символів";
        return;
    }
    if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = "Паролі не співпадають";
        return;
    }

    await store
        .register(form.value)
        .then(() => {
            toast.success("Ви успішно зареєструвалися!");
            form.value = {
                username: "",
                password: "",
                confirmPassword: "",
            };
            router.push("/");
        })
        .catch((error = null) => {
            toast.error(error ?? "Виникла помилка!");
        });
};
</script>

<template>
    <page-wrapper :auth="true" title="Реєстрація">
        <form @submit.prevent="handleRegister" class="space-y-6">
            <u-input
                id="username"
                placeholder="Введіть ваше ім'я"
                :required="true"
                label="Ім'я"
                v-model="form.username"
                :error="errors.username"
            />

            <u-input
                id="password"
                placeholder="Введіть ваш пароль"
                :required="true"
                label="Пароль"
                v-model="form.password"
                type="password"
                :error="errors.password"
            />

            <u-input
                id="confirmPassword"
                placeholder="Підтвердіть ваш пароль"
                :required="true"
                label="Підтвердіть пароль"
                v-model="form.confirmPassword"
                type="password"
                :error="errors.confirmPassword"
            />

            <button
                type="submit"
                class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                <div v-if="store.loading">
                    <loader w="24px" h="24px" bw="3px" borderColor="#FFF" />
                </div>
                <span v-else>Зареєструватися</span>
            </button>

            <p class="text-center text-gray-600">
                Вже зареєстровані?
                <router-link
                    to="/login"
                    class="text-blue-500 hover:text-blue-600"
                >
                    Увійти
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