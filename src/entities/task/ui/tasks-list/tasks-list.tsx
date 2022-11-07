import { useList } from 'effector-react/scope';
import { TaskCard, taskModel } from '~/entities/task';

export const TasksList = () => {
  const tasks = useList(taskModel.$tasksIds, {
    keys: [],
    fn: (taskId) => <TaskCard key={taskId} id={taskId} />,
  });

  return <div className='flex flex-col gap-2'>{tasks}</div>;
};
