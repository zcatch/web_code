import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

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
];

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes,
});

export default router;
