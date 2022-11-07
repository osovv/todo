import { Checkbox, Typography } from '@material-tailwind/react';
import cn from 'classnames';
import { useStoreMap, useUnit } from 'effector-react/scope';
import React from 'react';
import { $tasks, Task, taskStatusUpdated } from '../../model';

export interface TaskCardProps {
  id: Task['id'];
  ToggleSlot?: React.ReactNode;
  EditSlot?: React.ReactNode;
  DeleteSlot?: React.ReactNode;
}

export const TaskCard = ({ id, EditSlot, DeleteSlot }: TaskCardProps) => {
  const task = useStoreMap({
    store: $tasks,
    keys: [id],
    fn: (tasks, [taskId]) => tasks.find(({ id }) => id === taskId),
  });

  const onChange = useUnit(taskStatusUpdated);

  const idStr = React.useMemo(() => `task-card-${id}`, [id]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const status: Task['status'] =
        e.target.checked === true ? 'completed' : 'active';
      onChange([id, status]);
    },
    [id, onChange],
  );

  if (!task) {
    return null;
  }

  const isChecked = task.status === 'completed';

  return (
    <div
      id={idStr}
      className='border-b-2 border-gray-300 p-2 [--actions-opacity:0] hover:[--actions-opacity:100]'
    >
      <div className='relative flex gap-2 p-0'>
        <div className='flex max-h-6 items-center [&>div>label]:p-0'>
          <Checkbox
            defaultChecked={isChecked}
            ripple={false}
            onChange={handleChange}
            className='[&:before]:h-0 [&:before]:w-0'
          />
        </div>
        <div className='line-clamp-3'>
          <Typography
            variant='lead'
            className={cn('leading-1 break-normal', {
              'line-through': isChecked,
            })}
          >
            {task.title}
          </Typography>
          <Typography variant='small' className='truncate text-gray-500'>
            {task.description}
          </Typography>
          <div className='absolute top-0 right-0 flex gap-2 bg-white opacity-[var(--actions-opacity)] [&>button]:focus:[--actions-opacity:100]'>
            {EditSlot}
            {DeleteSlot}
          </div>
        </div>
      </div>
    </div>
  );
};
