import { taskModel } from '~/entities/task';

export const taskStatusUpdated = taskModel.taskUpdated.prepend<{
  id: taskModel.Task['id'];
  status: taskModel.Task['status'];
}>(({ id, status }) => ({ id, data: { status } }));
