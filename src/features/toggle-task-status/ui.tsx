import { Checkbox } from '@material-tailwind/react';
import { useStoreMap, useUnit } from 'effector-react/scope';
import { useCallback } from 'react';
import { taskModel } from '~/entities/task';
import { getEntityById } from '~/shared/lib/effector';
import { taskStatusUpdated } from './model';

interface ToggleTaskProps {
  id: taskModel.Task['id'];
}

export const ToggleTask = ({ id }: ToggleTaskProps) => {
  const task = useStoreMap({
    store: taskModel.$tasks,
    keys: [id],
    fn: (tasks, [taskId]) => getEntityById(tasks, taskId),
  });

  const updateTaskStatus = useUnit(taskStatusUpdated);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const status: taskModel.Task['status'] =
        e.target.checked === true ? 'completed' : 'active';
      updateTaskStatus({ id, status });
    },
    [id, updateTaskStatus],
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
