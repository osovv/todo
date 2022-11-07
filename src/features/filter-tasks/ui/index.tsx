import { Checkbox } from '@material-tailwind/react';
import { useUnit } from 'effector-react/scope';
import React from 'react';
import { $filter } from '~/entities/task/model';
import { filterByStatusChanged } from '../model';

export const ShowCompletedTasks = () => {
  const filterByStatusEnabled = useUnit($filter).status;

  const toggleFilter = useUnit(filterByStatusChanged);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      toggleFilter(undefined);
    } else {
      toggleFilter('active');
    }
  };

  return (
    <Checkbox
      defaultChecked={filterByStatusEnabled !== 'active'}
      ripple={false}
      onChange={handleChange}
      className='[&:before]:h-0 [&:before]:w-0'
      label='Show completed tasks'
    />
  );
};
