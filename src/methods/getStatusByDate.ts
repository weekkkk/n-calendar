/** @format */

import { StatusEnum } from '@/enums';

/** Вернуть статус по доте */
const getStatusByDate = (date: Date, selectDate: Date | undefined) => {
  const today = new Date().getShortDate();
  if (!selectDate?.getCompare(date)) return StatusEnum.Brand;
  else if (!today.getCompare(date)) return StatusEnum.Danger;
  return StatusEnum.Base;
};
export default getStatusByDate;
