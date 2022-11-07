import { Typography } from '@material-tailwind/react';
import { useUnit } from 'effector-react/scope';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { taskModel } from '~/entities/task';
import { AddTask } from '~/features/add-task';
import { ShowCompletedTasks } from '~/features/filter-tasks';
import { TaskManager } from '~/widgets/task-manager';

const TasksList = () => {
  const tasksIds = useUnit(taskModel.$visibleTasksIds);
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
      <div className='flex w-full justify-between'>
        <Typography variant='h4' className='inline'>
          Tasks
        </Typography>
        <ShowCompletedTasks />
      </div>
      <TasksList />
      <div className='mt-2'>
        <AddTask key={addTaskOpened} />
      </div>
    </>
  );
};
