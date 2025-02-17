import BookDetail from '@/pages/BookDetail.vue';
import CreateBook from '@/pages/CreateBook.vue';
import EditBook from '@/pages/EditBook.vue';
import HomePage from '@/pages/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/add-book',
        name: 'add-book',
        component: CreateBook,
    },
    {
        path: '/edit-book/:id',
        name: 'edit-book',
        component: EditBook,
    },
    {
        path: '/book/:id',
        name: 'book-detail',
        component: BookDetail,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;