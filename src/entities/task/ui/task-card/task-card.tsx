import { Typography } from '@material-tailwind/react';
import cn from 'classnames';
import { useStoreMap } from 'effector-react/scope';
import React from 'react';
import { getEntityById } from '~/shared/lib/effector';
import { $tasks, Task } from '../../model';

export interface TaskCardProps {
  id: Task['id'];
  ToggleStatusSlot?: React.ReactNode;
  EditSlot?: React.ReactNode;
  DeleteSlot?: React.ReactNode;
}

export const TaskCard = ({
  id,
  ToggleStatusSlot,
  EditSlot,
  DeleteSlot,
}: TaskCardProps) => {
  const task = useStoreMap({
    store: $tasks,
    keys: [id],
    fn: (tasks, [taskId]) => getEntityById(tasks, taskId),
  });

  const idStr = React.useMemo(() => `task-card-${id}`, [id]);

  if (!task) {
    return null;
  }

  const isCompleted = task.status === 'completed';

  return (
    <div
      id={idStr}
      className='border-b-2 border-gray-300 p-2 [--actions-opacity:0] hover:[--actions-opacity:100]'
    >
      <div className='relative flex gap-2 p-0'>
        <div className='flex max-h-6 items-center [&>div>label]:p-0'>
          {ToggleStatusSlot}
        </div>
        <div className='line-clamp-3'>
          <Typography
            variant='lead'
            className={cn('leading-1 break-normal', {
              'line-through': isCompleted,
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
