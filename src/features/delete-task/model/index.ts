import { createEvent } from 'effector';
import { taskModel } from '~/entities/task';

export const taskRemoved = createEvent<taskModel.Task['id']>();

taskModel.$tasks.on(taskRemoved, (currentTasks, removedTaskId) =>
  currentTasks.filter((task) => task.id !== removedTaskId),
);
