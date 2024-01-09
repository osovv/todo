import { useAction, useAtom } from '@reatom/npm-react';
import { TaskEditor, taskModel } from '~/entities/task';
import { tasksAtom } from '~/entities/task/model';
import { getEntityById } from '~/shared/lib/entity';

interface EditTaskProps {
  id: taskModel.Task['id'];
  onSubmit: (_: void) => void;
  onClose: (_: void) => void;
}

export const EditTask = ({ id, onClose, onSubmit }: EditTaskProps) => {
  const [task] = useAtom((ctx) => {
    const tasks = ctx.spy(tasksAtom);

    return getEntityById(tasks, id);
  });

  const updateTask = useAction(taskModel.updateTask);

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
