/** @format */

import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { StatusEnum } from '@/enums';

export const useCalendarStore = defineStore('calendar', () => {
  /** Первый день недели */
  const firstDayOfWeek = ref(0);

  /** Сегодняшняя дата */
  const today = ref(new Date().getShortDate());
  /** Дата, на которой фокус */
  const selectDate = ref<Date>(new Date().getShortDate());
  /** Установить выбранную дату */
  const setSelectDate = (date: Date) => {
    console.log('setSelectDate');
    selectDate.value = date.getShortDate();
  };
  return { firstDayOfWeek, selectDate, setSelectDate };
});
