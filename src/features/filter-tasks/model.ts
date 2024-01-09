import { action } from '@reatom/framework';
import { taskModel } from '~/entities/task';
import { filterAtom } from '~/entities/task/model';

export const updateStatusFilter = action(
  (ctx, status: taskModel.Filter['status']) => {
    const filter = ctx.get(taskModel.filterAtom);

    filterAtom(ctx, { ...filter, status });
  },
  'updateStatusFilter',
);
