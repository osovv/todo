import { createEvent } from 'effector';
import { $tasks, Task } from '~/entities/task/model';

export const taskRemoved = createEvent<Task['id']>();

$tasks.on(taskRemoved, (currentTasks, removedTaskId) =>
  currentTasks.filter((task) => task.id !== removedTaskId),
);
