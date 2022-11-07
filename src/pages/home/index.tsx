import { Typography } from '@material-tailwind/react';
import { useUnit } from 'effector-react/scope';
import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { taskModel } from '~/entities/task';
import { AddTask } from '~/features/add-task';
import { TaskManager } from '~/widgets/task-manager';

const TasksList = () => {
  const tasksIds = useUnit(taskModel.$tasksIds);
  return (
    <div className='flex flex-col gap-2'>
      {tasksIds.map((taskId) => (
        <TaskManager key={taskId} id={taskId} />
      ))}
    </div>
  );
};

export const HomePage = () => {
  const [addTaskOpened, setAddTaskOpened] = useState(0);

  useHotkeys('ctrl+space', () => setAddTaskOpened((count) => count + 1));

  return (
    <>
      <Typography variant='h4'>Tasks</Typography>
      <TasksList />
      <div className='mt-2'>
        <AddTask key={addTaskOpened} />
      </div>
    </>
  );
};
