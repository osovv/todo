import { IconButton, Typography } from '@material-tailwind/react';
import { useAction, useAtom } from '@reatom/npm-react';
import { taskModel } from '~/entities/task';
import { AddTask } from '~/features/add-task';
import { ShowCompletedTasks } from '~/features/filter-tasks';
import { Icon, SortableList } from '~/shared/ui';
import { TaskManager } from '~/widgets/task-manager';

interface TasksListProps {
  tasks: taskModel.Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  const moveTask = useAction(taskModel.moveTask);

  return (
    <div className='flex flex-col'>
      <SortableList
        items={tasks}
        itemMoved={moveTask}
        componentFn={(attributes, listeners, task) => {
          return (
            <div className='group relative flex w-full border-b-2 border-gray-300 bg-white pt-1'>
              <div
                className='absolute -left-6 mt-2 flex h-7 items-center opacity-0 group-hover:opacity-100'
                {...listeners}
                {...attributes}
              >
                <IconButton variant='text' size='md' className='h-5 w-5 p-0'>
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

const EmptyTasksInfo = () => {
  return (
    <div className='flex max-h-[50%] flex-grow items-center justify-center'>
      <Typography variant='lead'>What will you accomplish?</Typography>
    </div>
  );
};

const HomePage = () => {
  const [tasks] = useAtom(taskModel.visibleTasksAtom);

  return (
    <div className='flex h-full flex-col'>
      <div className='flex w-full justify-between'>
        <Typography variant='h4' className='my-auto inline'>
          Tasks
        </Typography>
        <ShowCompletedTasks />
      </div>
      <div className='bg-gray-50'>
        <TasksList tasks={tasks} />
      </div>
      <div className='mt-2'>
        <AddTask />
      </div>
      {tasks.length === 0 ? <EmptyTasksInfo /> : null}
    </div>
  );
};

export { HomePage };
