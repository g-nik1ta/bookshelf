import BookDetail from '@/pages/BookDetail.vue';
import CreateBook from '@/pages/CreateBook.vue';
import EditBook from '@/pages/EditBook.vue';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import NotFound from '@/pages/NotFound.vue';
import Register from '@/pages/Register.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/add-book',
        name: 'add-book',
        component: CreateBook,
        meta: { requiresAuth: true },
    },
    {
        path: '/edit-book/:id',
        name: 'edit-book',
        component: EditBook,
        meta: { requiresAuth: true },
    },
    {
        path: '/book/:id',
        name: 'book-detail',
        component: BookDetail,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { requiresAuth: false },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = checkAuth();

    if (to.meta?.requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
        next({ name: 'home' });
    } else {
        next();
    }
});

const checkAuth = () => {
    return !!localStorage.getItem('authToken');
}

export default router;