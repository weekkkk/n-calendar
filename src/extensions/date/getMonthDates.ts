/** @format */

interface Date {
  /** Возвращает дни месяца, к которым относится дата */
  getMonthDates(firstDayOfWeek?: number): Date[];
}

Date.prototype.getMonthDates = function (firstDayOfWeek: number = 1): Date[] {
  let dates: Date[] = [];
  for (let i = 0; i < 6; i++) {
    const firstDate = this.getClone();
    const day = firstDate.getDay() || 7;
    firstDate.setDate(i * 7 - day + 2);
    dates = dates.concat(firstDate.getWeekDates(firstDayOfWeek));
  }
  return dates;
};
