import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
} from '@material-tailwind/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { Task, TaskDataWithoutStatus } from '../../model';

interface TaskEditorProps {
  title: Task['title'] | undefined;
  description: Task['description'] | undefined;
  submitButtonText: string;
  onSubmit: (data: TaskDataWithoutStatus) => void;
  onClose: (_: void) => void;
}

export const TaskEditor = ({
  title: initialTitle,
  description: initialDescription,
  submitButtonText,
  onSubmit,
  onClose,
}: TaskEditorProps) => {
  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const handleSubmit = useCallback(
    () =>
      onSubmit({
        title,
        description,
      }),
    [onSubmit, title, description],
  );

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    [],
  );

  const onChangeDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value),
    [],
  );

  const isValid = title !== '';

  return (
    <div className='relative'>
      <Card shadow={false} className='border-2 border-gray-400'>
        <CardBody className='p-2'>
          <Input
            variant='standard'
            placeholder='Task name'
            className='border-none text-base placeholder:text-base placeholder:text-gray-500'
            value={title}
            onChange={onChangeTitle}
          />
          <Textarea
            variant='standard'
            placeholder='Description'
            className='border-none text-sm placeholder:text-sm placeholder:text-gray-500'
            value={description}
            onChange={onChangeDescription}
          />
        </CardBody>
      </Card>
      <div className='absolute right-0 mt-2 flex gap-2'>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={!isValid} onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </div>
    </div>
  );
};
