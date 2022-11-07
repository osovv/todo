import { createEvent } from 'effector';
import { $filter, Filter } from '~/entities/task/model';

export const filterByStatusChanged = createEvent<Filter['status']>();

$filter.on(filterByStatusChanged, (currentFilter, status) => ({
  ...currentFilter,
  status,
}));
