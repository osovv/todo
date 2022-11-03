import { useUnit } from 'effector-react';
import { $tasks, taskStatusUpdated } from '~/entities/task/model';
import { TaskCard } from '~/entities/task/ui/task-card/task-card';

export const HomePage = () => {
  const tasks = useUnit($tasks);

  const onTaskStatusChanged = useUnit(taskStatusUpdated);

  return (
    <>
      <h1>Tasks</h1>
      <div className='flex flex-col gap-2'>
        {tasks.map((task) => (
          <TaskCard
            key={`${task.id}`}
            {...task}
            onChange={onTaskStatusChanged}
          />
        ))}
      </div>
    </>
  );
};
