/** @format */

interface Date {
  /** Возвращает дату без времени */
  getShortDate(): Date;
}

Date.prototype.getShortDate = function (): Date {
  const date: Date = this.getClone();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};
