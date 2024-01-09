import { action } from '@reatom/framework';
import { taskModel } from '~/entities/task';
import { updateTask } from '~/entities/task/model';

export const updateTaskStatus = action(
  (
    ctx,
    {
      id,
      status,
    }: { id: taskModel.Task['id']; status: taskModel.Task['status'] },
  ) => {
    updateTask(ctx, { id, data: { status } });
  },
  'updateTaskStatus',
);
