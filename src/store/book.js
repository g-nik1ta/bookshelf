import useRequest from "@/composable/useRequest";
import { defineStore } from "pinia";

import { ref } from "vue";
import { useAuthStore } from "./user";

const API = {
    get: 'http://localhost:3000/books',
    post: 'http://localhost:3000/books',
    put: 'http://localhost:3000/books',
    delete: 'http://localhost:3000/books',
}

// const wait = () => {
//     return new Promise(resolve => {
//         setTimeout(resolve, 10000);
//     });
// }

export const useBookStore = defineStore("book", () => {
    const request = useRequest();
    const authStore = useAuthStore()

    const loading = ref(false)
    const state = ref([])

    const getBooks = async () => {
        loading.value = true
        // await wait()
        return await request.get(
            `${API.get}?user_id=${authStore.state?.id}`,
            [],
            (response) => {
                state.value = response;
                loading.value = false
            },
            (response) => {
                console.log("error: ", response);
                loading.value = false
            }
        );
    }

    const createBook = async (data) => {
        const existingBook = state.value.find((book) => book.id === data.id);
        if (existingBook) {
            throw 'Книжка з таким ID вже існує.'
        }

        loading.value = true
        return await request.post(
            API.post,
            data,
            (response) => {
                state.value = [...state.value, response]
                loading.value = false
            },
            (response) => {
                console.log("error: ", response);
                loading.value = false
            }
        );
    }

    const updateBook = async (data) => {
        loading.value = true
        return await request.put(
            `${API.put}/${data.id}`,
            data,
            (response) => {
                console.log(response);

                // state.value = [...state.value, response]
                loading.value = false
            },
            (response) => {
                console.log("error: ", response);
                loading.value = false
            }
        );
    }

    const deleteBook = async (bookId) => {
        loading.value = true
        return await request.destroy(
            `${API.delete}/${bookId}`,
            {},
            (response) => {
                state.value = state.value.filter(item => item.id !== response.id)
                loading.value = false
            },
            (response) => {
                console.log("error: ", response);
                loading.value = false
            }
        );
    }

    return {
        state,
        loading,
        getBooks,
        createBook,
        updateBook,
        deleteBook
    }
})