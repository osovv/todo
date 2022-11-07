import { Task, taskUpdated } from '~/entities/task/model';

export const taskStatusUpdated = taskUpdated.prepend<{
  id: Task['id'];
  status: Task['status'];
}>(({ id, status }) => ({ id, data: { status } }));
