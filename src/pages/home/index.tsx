import { Typography } from '@material-tailwind/react';
import { TasksList } from '~/widgets/tasks-list';

export const HomePage = () => {
  return (
    <>
      <Typography variant='h4'>Tasks</Typography>
      <TasksList />
    </>
  );
};
