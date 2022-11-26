/** @format */

import type { IHourInterval } from '@/interfaces';
/** Интервал часов */
export default class HourIntervalModel implements IHourInterval {
  /** Начало */
  Start: number = 0;
  /** Конец */
  End: number = 24;
  /** Конструктор */
  constructor(obj?: Partial<HourIntervalModel>) {
    if (obj) Object.assign(this, obj);
  }
  /** Часы */
  get Hours(): number[] {
    const hours: number[] = [];
    for (let hour = this.Start; hour < this.End; hour++) hours.push(hour);
    return hours;
  }
}
