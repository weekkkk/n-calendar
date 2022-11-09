/** @format */

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', () => {
  /** Первый день недели */
  const firstDayOfWeek = ref(0);
  /** Дата, на которой фокус */
  const focusDate = ref(new Date());

  return { firstDayOfWeek };
});
