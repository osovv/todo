import {
  Button,
  Card,
  CardBody,
  Input,
  input,
  Textarea,
} from '@material-tailwind/react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Task, TaskDataWithoutStatus } from '../../model';

interface TaskEditorProps {
  title?: Task['title'];
  description?: Task['description'];
  submitButtonText: string;
  onSubmit: (data: TaskDataWithoutStatus) => void;
  onClose: (_: void) => void;
}

export const TaskEditor = ({
  title: initialTitle = '',
  description: initialDescription = '',
  submitButtonText,
  onSubmit,
  onClose,
}: TaskEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
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

  const titleInput = useRef<HTMLInputElement>(null);

  const inputEl = titleInput.current?.firstChild as
    | HTMLInputElement
    | null
    | undefined;

  useEffect(() => {
    inputEl?.focus();
  }, [inputEl]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
      if (event.key === 'Enter' && isValid) {
        if (event.ctrlKey) {
          handleSubmit();
        }
        if (document.activeElement === inputEl) {
          handleSubmit();
        }
      }
    },
    [handleClose, handleSubmit, isValid, inputEl],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false);

    return () => {
      document.removeEventListener('keydown', handleKeydown, false);
    };
  }, [handleKeydown]);

  return (
    <div className='relative'>
      <Card shadow={false} className='border-2 border-gray-400'>
        <CardBody className='p-2'>
          <Input
            ref={titleInput}
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
        <Button onClick={handleClose} className='outlined'>
          Cancel
        </Button>
        <Button disabled={!isValid} onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </div>
    </div>
  );
};
