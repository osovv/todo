import { Typography } from '@material-tailwind/react';
import { useUnit } from 'effector-react/scope';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { taskModel } from '~/entities/task';
import { AddTask } from '~/features/add-task';
import { ShowCompletedTasks } from '~/features/filter-tasks';
import { Icon, SortableList } from '~/shared/ui';
import { TaskManager } from '~/widgets/task-manager';

const TasksList = () => {
  const tasks = useUnit(taskModel.$visibleTasks);
  const taskMoved = useUnit(taskModel.taskMoved);

  return (
    <div className='flex flex-col gap-2'>
      <SortableList
        items={tasks}
        itemMoved={taskMoved}
        componentFn={(task) => <TaskManager id={task.id} />}
      />
    </div>
  );
};

export const HomePage = () => {
  const [addTaskOpened, setAddTaskOpened] = useState(0);

  useHotkeys('ctrl+space', () => setAddTaskOpened((count) => count + 1));

  return (
    <>
      <div className='flex w-full justify-between'>
        <Typography variant='h4' className='my-auto inline'>
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
