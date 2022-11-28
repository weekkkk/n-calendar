interface Number {
  /**
   * Возвращает число в формате строки
   */
  getString(length?: number): string;
}
Number.prototype.getString = function (length: number = 2): string {
  let str = this.toString();
  for (let i = 0; i < length; i++) {
    if (str.length >= length) return str;
    str = 0 + str;
  }
  return str;
};
