import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from '@material-tailwind/react';
import { useAction, useAtom } from '@reatom/npm-react';
import { useCallback, useState } from 'react';
import { taskModel } from '~/entities/task';
import { tasksAtom } from '~/entities/task/model';
import { getEntityById } from '~/shared/lib/entity';
import { Icon } from '~/shared/ui';
import { removeTask } from './model';

interface DeleteTaskProps {
  id: taskModel.Task['id'];
}

const taskTitleString = (task: taskModel.Task | undefined): string => {
  if (task?.title) {
    if (task.title.length >= 50) {
      return task.title.slice(0, 47) + '...';
    }
    return task.title;
  }
  return '';
};

export const DeleteTask = ({ id }: DeleteTaskProps) => {
  const [task] = useAtom((ctx) => {
    const tasks = ctx.spy(tasksAtom);
    return getEntityById(tasks, id);
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = useCallback(
    () => setShowConfirmation((prev) => !prev),
    [],
  );

  const onRemove = useAction(removeTask);

  const onSubmit = () => {
    onRemove(id);
    handleConfirmation();
  };

  return (
    <>
      <Dialog size='lg' open={showConfirmation} handler={handleConfirmation}>
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
