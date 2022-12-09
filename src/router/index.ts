/** @format */

import { createRouter, createWebHistory } from 'vue-router';
import { MONTHS, WEEKS, DAYS } from './names';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'default',
      path: '/',
      component: () => import('@/layout/layout.vue'),
      children: [
        {
          name: MONTHS,
          path: `${MONTHS}/:count/:year/:month/:date`,
          component: () => import('@/pages/monts.vue'),
        },
        {
          name: WEEKS,
          path: `${WEEKS}/:count/:year/:month/:date`,
          component: () => import('@/pages/weeks.vue'),
        },
        {
          name: DAYS,
          path: `${DAYS}/:count/:year/:month/:date`,
          component: () => import('@/pages/days.vue'),
        },
      ],
    },
  ],
});

export default router;
