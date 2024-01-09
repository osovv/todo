import { action } from '@reatom/framework';
import { tasksAtom } from '~/entities/task/model';

export const removeTask = action((ctx, id) => {
  const tasks = ctx.get(tasksAtom);

  return tasks.filter((task) => task.id !== id);
}, 'removeTask');
