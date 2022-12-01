/** @format */

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'default',
      path: '/',
      component: () => import('@/layout/layout.vue'),
      children: [
        {
          name: 'days',
          path: '/days/:count',
          component: () => import('@/pages/days.vue'),
        },
        {
          name: 'weeks',
          path: '/weeks/:count',
          component: () => import('@/pages/weeks.vue'),
        },
      ],
    },
  ],
});

export default router;
