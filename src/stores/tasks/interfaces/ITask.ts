/** @format */

/** Задача */
export default interface ITask {
  /** Начало */
  Start: Date;
  /** Конец */
  End: Date;
  /** Заголовок */
  Title: string;
  /** Описание */
  Description: string;
}
