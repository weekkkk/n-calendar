/** @format */

import { ref } from 'vue';
import { defineStore } from 'pinia';
// import { DAYS } from '@/router/names';
// import { useRouter } from 'vue-router';

export const useCalendarStore = defineStore('calendar', () => {
  /** Первый день недели */
  const firstDayOfWeek = ref(0);

  /** Сегодняшняя дата */
  const today = ref(new Date().getShortDate());
  /** Дата, на которой фокус */
  const selectDate = ref<Date>(new Date().getShortDate());
  /** Установить выбранную дату */
  const setSelectDate = (date: Date) => {
    selectDate.value = date.getShortDate().getClone();
  };
  return {
    firstDayOfWeek,
    selectDate,
    setSelectDate,
  };
});
