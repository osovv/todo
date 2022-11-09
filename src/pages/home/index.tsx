import { IconButton, Typography } from '@material-tailwind/react';
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
        componentFn={(attributes, listeners, task) => {
          return (
            <div className='group relative flex w-full bg-white pb-2'>
              <div
                className='absolute -left-6 mt-2 flex h-7 items-center opacity-0 group-hover:opacity-100'
                {...listeners}
                {...attributes}
              >
                <IconButton variant='text' size='md' className='h-5 w-5  p-0'>
                  <Icon name='DragIndicatorIcon' size='5' />
                </IconButton>
              </div>
              <div className='flex-grow'>
                <TaskManager id={task.id} />
              </div>
            </div>
          );
        }}
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
