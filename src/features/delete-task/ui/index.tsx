import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from '@material-tailwind/react';
import { useStoreMap, useUnit } from 'effector-react/scope';
import { useCallback, useState } from 'react';
import { $tasks, Task } from '~/entities/task/model';
import { getEntityById } from '~/shared/lib/effector';
import { Icon } from '~/shared/ui';
import { taskRemoved } from '../model';

interface DeleteTaskProps {
  id: Task['id'];
}

const taskTitleString = (task: Task | undefined): string => {
  if (task?.title) {
    if (task.title.length >= 50) {
      return task.title.slice(0, 47) + '...';
    }
    return task.title;
  }
  return '';
};

export const DeleteTask = ({ id }: DeleteTaskProps) => {
  const task = useStoreMap({
    store: $tasks,
    keys: [id],
    fn: (tasks, [taskId]) => getEntityById(tasks, taskId),
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = useCallback(
    () => setShowConfirmation((prev) => !prev),
    [],
  );

  const removeTask = useUnit(taskRemoved);

  const onSubmit = () => {
    removeTask(id);
    handleConfirmation();
  };

  return (
    <>
      <Dialog open={showConfirmation} handler={handleConfirmation}>
        <DialogHeader>
          <Icon size='6' name='InformationCircleIcon' />
        </DialogHeader>
        <DialogBody>
          <div className='line-clamp-3'>
            Are you sure you want to delete{' '}
            <span className='font-black'>{taskTitleString(task)}</span>?
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleConfirmation}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' onClick={onSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <IconButton
        variant='text'
        size='sm'
        onClick={() => setShowConfirmation(true)}
      >
        <Icon size='6' name='TrashIcon' />
      </IconButton>
    </>
  );
};
