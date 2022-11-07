import { Button } from '@material-tailwind/react';
import { useUnit } from 'effector-react/scope';
import { useCallback, useState } from 'react';
import { TaskEditor } from '~/entities/task';
import { TaskDataWithoutStatus } from '~/entities/task/model';
import { taskCreatedByUser } from '../model';

interface AddTaskProps {
  show?: boolean;
}

export const AddTask = ({ show = true }: AddTaskProps) => {
  const [showForm, setShowForm] = useState(show);
  const [editorKey, setEditorKey] = useState(0);

  const onClose = useCallback(() => setShowForm(false), []);

  const submitButtonText = 'Add task';

  const onSubmit = useUnit(taskCreatedByUser);

  const handleSubmit = (payload: TaskDataWithoutStatus) => {
    setEditorKey((key) => key + 1);
    onSubmit(payload);
  };

  if (!showForm) {
    return (
      <div>
        <Button
          onClick={(_) => setShowForm(true)}
          variant='text'
          className='w-full p-2 text-left'
        >
          + Add task
        </Button>
      </div>
    );
  }

  return (
    <TaskEditor
      key={editorKey}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={submitButtonText}
    />
  );
};
