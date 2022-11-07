import { useStoreMap, useUnit } from 'effector-react/scope';
import { TaskEditor, taskModel } from '~/entities/task';
import { Task, TaskDataOptional, taskUpdated } from '~/entities/task/model';
import { getEntityById } from '~/shared/lib/effector';

interface EditTaskProps {
  id: Task['id'];
}

export const EditTask = ({ id }: EditTaskProps) => {
  const task = useStoreMap({
    store: taskModel.$tasks,
    keys: [id],
    fn: (tasks, [taskId]) => getEntityById(tasks, taskId),
  });

  const updateTask = useUnit(taskUpdated);

  if (!task) {
    return null;
  }

  const handleSubmit = (payload: TaskDataOptional) => {
    updateTask({ id, data: payload });
  };

  const onClose = () => null;

  return (
    <TaskEditor
      title={task.title}
      description={task.description}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText='Save changes'
    />
  );
};
