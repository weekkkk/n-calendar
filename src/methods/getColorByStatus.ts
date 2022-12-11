/** @format */

import { StatusEnum } from '@/enums';

/** Вернуть цвет по статусу */
const getColorByStatus = (status: StatusEnum) => {
  switch (status) {
    case StatusEnum.Base:
      return 'var(--nc-c-base)';
    case StatusEnum.Danger:
      return 'var(--nc-c-danger)';
    case StatusEnum.Brand:
      return 'var(--nc-c-brand)';
    case StatusEnum.Secondary:
      return 'var(--nc-c-secondary)';
    case StatusEnum.Success:
      return 'var(--nc-c-success)';
    case StatusEnum.Warning:
      return 'var(--nc-c-warning)';
    case StatusEnum.Default:
      return 'var(--nc-c-default)';
  }
};
export default getColorByStatus;
