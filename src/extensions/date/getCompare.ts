/** @format */

interface Date {
  /** Возвращает результат стравнения даты с переданной */
  getCompare(compareDate: Date): number;
}

Date.prototype.getCompare = function (compareDate: Date): number {
  if (this.getTime() == compareDate.getTime()) return 0;
  else if (this.getTime() < compareDate.getTime()) return -1;
  else return 1;
};
