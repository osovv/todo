import { useUnit } from 'effector-react/scope';
import { TaskCard, taskModel } from '~/entities/task';
import { DeleteTask } from '~/features/delete-task/ui';
import { ToggleTask } from '~/features/toggle-task-status';
import { Icon } from '~/shared/ui';

export const TasksList = () => {
  const tasksIds = useUnit(taskModel.$tasksIds);
  return (
    <div className='flex flex-col gap-2'>
      {tasksIds.map((taskId) => (
        <TaskCard
          key={taskId}
          id={taskId}
          ToggleStatusSlot={<ToggleTask id={taskId} />}
          EditSlot={<Icon size='6' name='PencilSquareIcon' />}
          DeleteSlot={<DeleteTask id={taskId} />}
        />
      ))}
    </div>
  );
};
