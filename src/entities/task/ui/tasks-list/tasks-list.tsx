import { useUnit } from 'effector-react/scope';
import { TaskCard, taskModel } from '~/entities/task';

export const TasksList = () => {
  const tasks = useUnit(taskModel.$tasksIds);

  return (
    <div className='flex flex-col gap-2'>
      {tasks.map((taskId) => (
        <TaskCard key={taskId} id={taskId} />
      ))}
    </div>
  );
};
