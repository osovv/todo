import { createEvent } from 'effector';
import { taskModel } from '~/entities/task';

export const filterByStatusChanged = createEvent<taskModel.Filter['status']>();

taskModel.$filter.on(filterByStatusChanged, (currentFilter, status) => ({
  ...currentFilter,
  status,
}));
