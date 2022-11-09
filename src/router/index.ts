/** @format */

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'test',
      path: '/',
      component: () => import('@/pages/test-page.vue'),
    },
  ],
});

export default router;
