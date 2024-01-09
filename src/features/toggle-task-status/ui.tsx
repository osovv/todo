import { Checkbox } from '@material-tailwind/react';
import { useAction, useAtom } from '@reatom/npm-react';
import { useCallback } from 'react';
import { taskModel } from '~/entities/task';
import { getEntityById } from '~/shared/lib/entity';
import { updateTaskStatus } from './model';

interface ToggleTaskProps {
  id: taskModel.Task['id'];
}

export const ToggleTask = ({ id }: ToggleTaskProps) => {
  const [task] = useAtom((ctx) => {
    const tasks = ctx.spy(taskModel.tasksAtom);
    return getEntityById(tasks, id);
  });

  const handleTaskStatusUpdate = useAction(updateTaskStatus);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const status: taskModel.Task['status'] =
        e.target.checked === true ? 'completed' : 'active';
      handleTaskStatusUpdate({ id, status });
    },
    [id, handleTaskStatusUpdate],
  );

  if (!task) {
    return null;
  }

  const isCompleted = task.status === 'completed';

  return (
    <Checkbox
      defaultChecked={isCompleted}
      ripple={false}
      onChange={handleChange}
      className='[&:before]:h-0 [&:before]:w-0'
    />
  );
};
