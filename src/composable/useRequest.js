import axios from "axios";
import { ref } from "vue";

export default function useRequest() {
    const loading = ref(false)
    const message = ref(null)
    const error = ref(null)

    const startProcess = () => {
        loading.value = true
        message.value = null
        error.value = null
    }

    const finishProcess = (response) => {
        loading.value = false
        
        if (response) {
            message.value = response?.data?.message || null
            error.value = response?.data?.error || null
        }
    }

    const onResponseError = (onError, response) => {
        onError(response)
        finishProcess(response?.response || null)
    }

    const onResponseSuccess = (onSuccess, response) => {
        finishProcess(response)
        onSuccess(response?.data || null)
    }

    const get = async (url, params = [], onSuccess = () => { }, onError = () => { }) => {
        startProcess()
        return await axios
            .get(url, {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                onResponseSuccess(onSuccess, response)

                return response
            })
            .catch((error) => {
                onResponseError(onError, error.response ? error.response : error)

                throw error.response ? error.response : error
            })
    }

    const post = async (url, data = {}, onSuccess = () => { }, onError = () => { }) => {
        startProcess()
        return await axios
            .post(url, data)
            .then((response) => {
                onResponseSuccess(onSuccess, response)

                return response
            })
            .catch((error) => {
                onResponseError(onError, error.response ? error.response : error)

                throw error.response ? error.response : error
            })
    }

    const put = async (url, data = {}, onSuccess = () => { }, onError = () => { }) => {
        startProcess()
        return await axios
            .put(url, data)
            .then((response) => {
                onResponseSuccess(onSuccess, response)

                return response
            })
            .catch((error) => {
                onResponseError(onError, error.response ? error.response : error)

                throw error.response ? error.response : error
            })
    }

    const patch = async (url, data = {}, onSuccess = () => { }, onError = () => { }) => {
        startProcess()
        return await axios
            .patch(url, data)
            .then((response) => {
                onResponseSuccess(onSuccess, response)

                return response
            })
            .catch((error) => {
                onResponseError(onError, error.response ? error.response : error)

                throw error.response ? error.response : error
            })
    }

    const destroy = async (url, data = {}, onSuccess = () => { }, onError = () => { }) => {
        startProcess()
        return await axios
            .delete(url, data)
            .then((response) => {
                onResponseSuccess(onSuccess, response)

                return response
            })
            .catch((error) => {
                onResponseError(onError, error.response ? error.response : error)

                throw error.response ? error.response : error
            })
    }

    return {
        get,
        post,
        put,
        patch,
        destroy,
        loading,
        message,
        error,
    }
}