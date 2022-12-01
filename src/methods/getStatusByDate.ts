/** @format */

import { StatusEnum } from '@/enums';
import { useCalendarStore } from '@/stores/calendar';

const calendar = useCalendarStore();
/** Вернуть статус по доте */
const getStatusByDate = (date: Date) => {
  const today = new Date().getShortDate();
  if (!calendar.selectDate.getCompare(date)) return StatusEnum.Focus;
  else if (!today.getCompare(date)) return StatusEnum.Danger;
  return StatusEnum.Base;
};
export default getStatusByDate;
