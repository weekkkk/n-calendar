/** @format */

import { StatusEnum } from '@/enums';

/** Вернуть статус по доте */
const getStatusByDate = (date: Date, selectDate: Date) => {
  const today = new Date().getShortDate();
  if (!selectDate.getCompare(date)) return StatusEnum.Focus;
  else if (!today.getCompare(date)) return StatusEnum.Danger;
  return StatusEnum.Base;
};
export default getStatusByDate;
