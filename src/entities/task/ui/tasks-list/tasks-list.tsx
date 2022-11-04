import { useUnit } from 'effector-react/scope';
import { TaskCard, taskModel } from '~/entities/task';

export const TasksList = () => {
  const tasks = useUnit(taskModel.$tasks);

  const onTaskStatusChanged = useUnit(taskModel.taskStatusUpdated);

  return (
    <div className='flex flex-col gap-2'>
      {tasks.map((task) => (
        <TaskCard key={`${task.id}`} {...task} onChange={onTaskStatusChanged} />
      ))}
    </div>
  );
};
