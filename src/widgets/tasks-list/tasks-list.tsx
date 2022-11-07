import { useList } from 'effector-react/scope';
import { TaskCard, taskModel } from '~/entities/task';
import { Icon } from '~/shared/ui';

export const TasksList = () => {
  const ActionsSlot = (
    <>
      <Icon size='6' name='PencilSquareIcon' />
      <Icon size='6' name='TrashIcon' />
    </>
  );

  const tasks = useList(taskModel.$tasksIds, {
    keys: [],
    fn: (taskId) => (
      <TaskCard key={taskId} id={taskId} ActionsSlot={ActionsSlot} />
    ),
  });

  return <div className='flex flex-col gap-2'>{tasks}</div>;
};
