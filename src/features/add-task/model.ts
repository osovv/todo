import { action } from '@reatom/framework';
import { taskModel } from '~/entities/task';
import { TaskDataWithoutStatus } from '~/entities/task/model';
import { getId } from '~/shared/lib/id';

export const createTask = action((ctx, data: TaskDataWithoutStatus) => {
  const newTask = {
    id: getId(),
    status: 'active',
    ...data,
  } as taskModel.Task;

  const tasks = ctx.get(taskModel.tasksAtom);

  const newTasks = [...tasks, newTask];

  taskModel.tasksAtom(ctx, newTasks);
}, 'createTask');
