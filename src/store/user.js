import useRequest from "@/composable/useRequest";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBookStore } from "./book";

const server = 'https://bookshelf-hzhh.onrender.com/'
// const server = 'http://localhost:3000/'

const API = {
    get: server + 'users',
    post: server + 'users',
}

export const useAuthStore = defineStore("user", () => {
    const request = useRequest();
    const bookStore = useBookStore()

    const loading = ref(false)
    const state = ref(null)
    const isAuthenticated = ref(!!localStorage.getItem('authToken'))

    const login = async () => {
        const token = localStorage.getItem('authToken');
        if (token === null) return

        if (token === 'null' && !!token) {
            localStorage.removeItem('authToken');
            isAuthenticated.value = false;
            throw 'Токен авторізації недійсний'
        }

        loading.value = true
        return await request.get(
            `${API.get}?id=${token}`,
            [],
            (response) => {
                if (!response || response.length < 1) {
                    loading.value = false
                    throw 'Сталась помилка при авторизації'
                }
                const user = response[0]
                state.value = user;
                localStorage.setItem('authToken', token);
                isAuthenticated.value = true;
                loading.value = false
            },
            (response) => {
                console.log("error: ", response);
                loading.value = false
            }
        );
    }

    const signIn = async (name, password) => {
        loading.value = true
        return await request.get(
            `${API.get}?username=${name}&password=${password}`,
            [],
            async (response) => {
                if (!response || response.length < 1) {
                    loading.value = false
                    throw 'Дані не вірні, перевірте Ім\'я та Пароль'
                }
                const user = response[0]
                state.value = user;
                localStorage.setItem('authToken', user.id);
                isAuthenticated.value = true;
                await bookStore.getBooks();
                loading.value = false
            },
            (response) => {
                console.log("error: ", response);
                loading.value = false
            }
        );
    }

    const register = async (data) => {
        loading.value = true
        await request.get(
            `${API.get}?username=${data.username}`,
            [],
            (response) => {
                if (!!response && response.length > 0) {
                    console.log(response.length);

                    loading.value = false
                    throw 'Користувач с таким ім\'ям вже існує'
                }
            },
            (response) => {
                console.log("error: ", response);
                loading.value = false
            }
        );

        return await request.post(
            API.post,
            data,
            (response) => {
                if (!response || response?.id === null) {
                    loading.value = false
                    throw 'Сталась помилка при реєстрації'
                }
                state.value = response;
                localStorage.setItem('authToken', response.id);
                isAuthenticated.value = true;
                loading.value = false
            },
            (response) => {
                console.log("error: ", response);
                loading.value = false
            }
        );
    }

    const logOut = async () => {
        localStorage.removeItem('authToken');
        isAuthenticated.value = false;
        state.value = null
        bookStore.state = []
    }

    return {
        state,
        isAuthenticated,
        loading,
        login,
        signIn,
        register,
        logOut
    }
})