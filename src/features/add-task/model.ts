import { createEvent } from 'effector';
import { taskModel } from '~/entities/task';
import { getId } from '~/shared/lib/id';

const taskCreated = createEvent<taskModel.Task>();

export const taskCreatedByUser =
  taskCreated.prepend<taskModel.TaskDataWithoutStatus>((taskData) => ({
    id: getId(),
    status: 'active',
    ...taskData,
  }));

taskModel.$tasks.on(taskCreated, (currentTasks, newTask) => [
  ...currentTasks,
  newTask,
]);
