/** @format */

interface Date {
  /** Возвращает часы в десятичном формате */
  getDecimalHours(): number;
}

Date.prototype.getDecimalHours = function (): number {
  return this.getHours() + this.getMinutes() / 60;
};
