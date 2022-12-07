/** @format */

interface Date {
  /** Возвращает клон даты */
  getClone(): Date;
}

Date.prototype.getClone = function (): Date {
  return new Date(this);
};
