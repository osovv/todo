import { Typography } from '@material-tailwind/react';
import { useCallback, useEffect, useState } from 'react';
import { AddTask } from '~/features/add-task';
import { TasksList } from '~/widgets/tasks-list';

export const HomePage = () => {
  const [addTaskOpened, setAddTaskOpened] = useState(0);

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === ' ') {
      setAddTaskOpened((a) => a + 1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false);

    return () => {
      document.removeEventListener('keydown', handleKeydown, false);
    };
  }, [handleKeydown]);

  return (
    <>
      <Typography variant='h4'>Tasks</Typography>
      <TasksList />
      <div className='mt-2'>
        <AddTask key={addTaskOpened} />
      </div>
    </>
  );
};
