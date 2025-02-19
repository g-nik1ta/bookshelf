import useRequest from "@/composable/useRequest";
import { defineStore } from "pinia";
import { ref } from "vue";

const API = {
    get: 'http://localhost:3000/books',
    post: 'http://localhost:3000/books',
}

// const wait = () => {
//     return new Promise(resolve => {
//         setTimeout(resolve, 1000);
//     });
// }

export const useBookStore = defineStore("book", () => {
    const request = useRequest();

    const loading = ref(false)
    const state = ref([])

    const getBooks = async () => {
        loading.value = true
        // await wait()
        return await request.get(
            API.get,
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

    return {
        state,
        loading,
        getBooks,
        createBook
    }
})