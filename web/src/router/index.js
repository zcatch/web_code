import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // lazy-loaded
        component: () => import('../views/About.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/Blog.vue'),
    },
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: () => import('../views/BlogDetail.vue'),
    },
];

const router = createRouter({
    history: createWebHistory('/'), // Vue Router 4 使用函数创建 History
    routes,
});

export default router;
