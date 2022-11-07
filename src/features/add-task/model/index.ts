import { createEvent } from 'effector';
import { $tasks, Task, TaskDataWithoutStatus } from '~/entities/task/model';
import { getId } from '~/shared/lib/id';

const taskCreated = createEvent<Task>();

export const taskCreatedByUser = taskCreated.prepend<TaskDataWithoutStatus>(
  (taskData) => ({
    id: getId(),
    status: 'active',
    ...taskData,
  }),
);

$tasks.on(taskCreated, (currentTasks, newTask) => [...currentTasks, newTask]);
