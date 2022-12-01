/** @format */

interface Date {
  /** Возвращает дни месяца, к которым относится дата */
  getMonthDates(firstDayOfWeek?: number): Date[];
}

Date.prototype.getMonthDates = function (firstDayOfWeek: number = 1): Date[] {
  let dates: Date[] = [];
  const firstDate = this.getClone();
  for (let i = 0; i < 6; i++) {
    firstDate.setDate(i * 7 + 1);
    dates = dates.concat(firstDate.getWeekDates(firstDayOfWeek));
  }
  return dates;
};
