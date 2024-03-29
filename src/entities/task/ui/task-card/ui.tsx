import { Typography } from '@material-tailwind/react';
import { useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { getEntityById } from '~/shared/lib/entity';
import { mergeRefs } from '~/shared/lib/react';
import { Task, tasksAtom } from '../../model';

export interface TaskCardProps {
  id: Task['id'];
  ToggleStatusSlot?: React.ReactNode;
  EditSlot?: React.ReactNode;
  DeleteSlot?: React.ReactNode;
  onDelete?: (_: void) => void;
  onEdit?: (_: void) => void;
}

export const TaskCard = ({
  id,
  ToggleStatusSlot,
  EditSlot,
  DeleteSlot,
  onDelete,
  onEdit,
}: TaskCardProps) => {
  const [task] = useAtom((ctx) => {
    const tasks = ctx.spy(tasksAtom);

    return getEntityById(tasks, id);
  });

  const idStr = React.useMemo(() => `task-card-${id}`, [id]);

  const ref1 = useHotkeys('ctrl+e', (e) => {
    e.preventDefault();
    onEdit?.();
  });

  const ref2 = useHotkeys('shift+del', () => onDelete?.());

  if (!task) {
    return null;
  }

  const isCompleted = task.status === 'completed';

  return (
    <div
      id={idStr}
      className='group bg-white p-2 pb-4 focus:bg-gray-100'
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      ref={mergeRefs([ref1, ref2])}
    >
      <div className='relative flex gap-2 p-0'>
        <div className='flex h-7 items-center [&>div>label]:p-0'>
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
            {task.description ?? ''}
          </Typography>
          <div className='absolute top-0 right-0 flex gap-1 bg-white opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 group-focus:bg-gray-100 '>
            {EditSlot}
            {DeleteSlot}
          </div>
        </div>
      </div>
    </div>
  );
};
