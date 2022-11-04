import { Checkbox, Typography } from '@material-tailwind/react';
import cn from 'classnames';
import React, { memo } from 'react';
import { Task } from '../../model';

export type OnChangeArgs = [Task['id'], Task['status']];

export type TaskCardProps = Task & {
  onChange: (args: OnChangeArgs) => void;
};

export const TaskCard = memo(
  ({ id, status, title, description, onChange }: TaskCardProps) => {
    const idStr = React.useMemo(() => `task-card-${id}`, [id]);

    const isChecked = React.useMemo(() => status === 'completed', [status]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const status: Task['status'] =
          e.target.checked === true ? 'completed' : 'active';
        onChange([id, status]);
      },
      [id, onChange],
    );

    return (
      <div id={idStr} className='border-b-2 border-gray-300 p-2'>
        <div className='flex gap-2 p-0'>
          <div className='flex max-h-6 items-center [&>div>label]:p-0'>
            <Checkbox
              defaultChecked={isChecked}
              ripple={false}
              onChange={handleChange}
              className='[&:before]:h-0 [&:before]:w-0'
            />
          </div>
          <div>
            <Typography
              variant='lead'
              className={cn('leading-1', { 'line-through': isChecked })}
            >
              {title}
            </Typography>
            <Typography variant='small' className='truncate text-gray-500'>
              {description}
            </Typography>
          </div>
        </div>
      </div>
    );
  },
);
