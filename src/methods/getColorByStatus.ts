/** @format */

import { StatusEnum } from '@/enums';

/** Вернуть цвет по статусу */
const getColorByStatus = (status: StatusEnum) => {
  switch (status) {
    case StatusEnum.Base:
      return 'var(--nc-c-base)';
    case StatusEnum.Danger:
      return 'var(--nc-c-danger)';
    case StatusEnum.Focus:
      return 'var(--nc-c-focus)';
    case StatusEnum.Secondary:
      return 'var(--nc-c-secondary)';
    case StatusEnum.Success:
      return 'var(--nc-c-success)';
    case StatusEnum.Warning:
      return 'var(--nc-c-warning)';
  }
};
export default getColorByStatus;
