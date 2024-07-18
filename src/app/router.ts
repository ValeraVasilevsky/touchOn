import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: (): Component => import('pages/(app)/layout.vue'),
            children: [
                {
                    path: '',
                    name: 'contacts',
                    component: (): Component => import('pages/(app)/contacts/index.vue')
                },
            ]
        }
    ] as RouteRecordRaw[]
})