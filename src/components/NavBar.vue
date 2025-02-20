<script setup>
import { useAuthStore } from "@/store/user";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter()

const logOutHandler = () => {
    store.logOut()
    router.push("/login");
}
</script>

<template>
    <nav>
        <router-link to="/">Головна</router-link> |
        <router-link to="/add-book">Додати книгу</router-link>
        <div class="sign_out">
            <span v-if="store.state?.username" class="name">
                Вітаємо, {{store.state?.username}}
            </span>
            <div
                @click="logOutHandler"
                class="button_logout bg-sky-500/15 hover:bg-sky-500/30 cursor-pointer bg-sky-500/15 hover:bg-sky-500/30 cursor-pointer"
            >
                <i class="mdi mdi-logout" style="font-size: 18px"></i>
            </div>
        </div>
    </nav>
</template>

<style lang='scss' scoped>
nav {
    padding: 1rem;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;

    a {
        margin: 0 0.5rem;
        text-decoration: none;
        color: #333;

        &.router-link-exact-active {
            color: #42b983;
            font-weight: bold;
        }
    }

    .sign_out {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 8px;

        .name {
            font-size: 14px;
        }

        .button_logout {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 6px;
        }
    }
}
</style>