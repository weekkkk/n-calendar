interface Date {
  /**
   * Каротка строка времени 11:00 и т.п
   */
  getShortTimeString(): string;
}
Date.prototype.getShortTimeString = function (): string {
  return `${ this.getHours().getString(2) }:${ this.getHours().getString(2) }`;
};
