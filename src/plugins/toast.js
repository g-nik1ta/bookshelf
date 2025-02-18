// plugins/toast.js
import { createToastInterface } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
    install(app) {
        const toast = createToastInterface({
            position: "bottom-right",
            timeout: 4000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1,
        });

        app.provide("toast", toast);
    },
};