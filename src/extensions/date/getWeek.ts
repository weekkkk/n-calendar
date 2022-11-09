/** @format */

interface Date {
  /** Возвращает дни недели, к которым относится дата */
  getWeek(firstDayOfWeek?: number): Date[];
}

Date.prototype.getWeek = function (firstDayOfWeek: number = 1): Date[] {
  const dates: Date[] = [];
  console.log('firstDayOfWeek', firstDayOfWeek);
  const day = (this.getDay() || 7) - (firstDayOfWeek - 1);
  const year = this.getFullYear();
  const month = this.getMonth();
  const date = this.getDate();
  for (let i = -day + 1; i <= 7 - day; i++)
    dates.push(new Date(year, month, date + i));
  return dates;
};
