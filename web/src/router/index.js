import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/Home.vue';

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
        component: () => import('../views/about/About.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/blog/Blog.vue'),
    },
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: () => import('../views/blog/BlogDetail.vue'),
    },
    {
        path: '/learning',
        name: 'LearningNotes',
        component: () => import('../views/learning/LearningNotes.vue'),
    },
    {
        path: '/learning/:techId/:chapterId/:sectionIndex',
        name: 'LearningSection',
        component: () => import('../views/learning/LearningSection.vue'),
    },
    {
        path: '/qa',
        name: 'QAList',
        component: () => import('../views/learning/QAList.vue'),
    },
    {
        path: '/qa/:category/:id',
        name: 'QADetail',
        component: () => import('../views/learning/QADetail.vue'),
    },
];

const router = createRouter({
    history: createWebHistory('/'), // Vue Router 4 使用函数创建 History
    routes,
});

export default router;
