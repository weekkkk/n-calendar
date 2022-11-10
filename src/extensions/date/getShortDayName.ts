/** @format */

interface Date {
  /** Название дня недели (короткое) */
  getShortDayName(): string;
}

Date.prototype.getShortDayName = function (): string {
  switch (this.getDay()) {
    case 0:
      return 'Вс';
    case 1:
      return 'Пн';
    case 2:
      return 'Вт';
    case 3:
      return 'Ср';
    case 4:
      return 'Чт';
    case 5:
      return 'Пт';
    case 6:
      return 'Сб';
    default:
      return '';
  }
};
