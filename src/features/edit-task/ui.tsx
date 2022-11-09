import { useStoreMap, useUnit } from 'effector-react/scope';
import { TaskEditor, taskModel } from '~/entities/task';
import { getEntityById } from '~/shared/lib/effector';

interface EditTaskProps {
  id: taskModel.Task['id'];
  onSubmit: (_: void) => void;
  onClose: (_: void) => void;
}

export const EditTask = ({ id, onClose, onSubmit }: EditTaskProps) => {
  const task = useStoreMap({
    store: taskModel.$tasks,
    keys: [id],
    fn: (tasks, [taskId]) => getEntityById(tasks, taskId),
  });

  const updateTask = useUnit(taskModel.taskUpdated);

  if (!task) {
    return null;
  }

  const handleSubmit = (payload: taskModel.TaskDataOptional) => {
    updateTask({ id, data: payload });
    onSubmit();
  };

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
