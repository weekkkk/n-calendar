/** @format */

import type { ITask } from '../interfaces';

/** Задача */
export default class TaskModel implements ITask {
  /** Начало */
  Start: Date = new Date();
  /** Конец */
  End: Date = new Date();
  /** Заголовок */
  Title: string = 'Name';
  /** Описание */
  Description: string = 'Description';
  constructor(obj?: Partial<TaskModel>) {
    if (obj) Object.assign(this, obj);
  }
  /** Час начала */
  get StartHour(): number {
    return this.Start.getDecimalHours();
  }
  set StartHour(value: number) {
    const date = this.Start.getClone();
    date.setHours(Math.floor(value), value - Math.floor(value));
    this.Start = date;
  }
  /** Час конца */
  get EndHour(): number {
    return this.Start.getDecimalHours();
  }
  set EndHour(value: number) {
    const date = this.End.getClone();
    date.setHours(Math.floor(value), value - Math.floor(value));
    this.End = date;
  }
}
