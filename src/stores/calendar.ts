/** @format */

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', () => {
  const firstDayOfWeek = ref(0);

  return { firstDayOfWeek };
});
