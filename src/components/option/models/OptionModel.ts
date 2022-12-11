/** @format */

import type { IOption } from '../interfaces';

/** Опция */
export default class OptionModel implements IOption {
  /** Уникальный ключ */
  Id: number = 0;
  /** Значение */
  Value: string = this.Id + '';
  /** Имя группы в которой находится опция */
  Name: string = 'option-group';
  /** Заголовок */
  Title: string = 'Option ' + this.Id;
  constructor(obj?: Partial<OptionModel>) {
    if (obj) Object.assign(this, obj);
  }
  /** Получить опцию из массива по ключу */
  static getOptionByKey(
    options: OptionModel[],
    value: string | number,
    key: 'Id' | 'Value' | 'Title' | 'Name' = 'Value'
  ): OptionModel | undefined {
    return options.find((option) => option[key] == value);
  }
}
