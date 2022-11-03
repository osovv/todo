import { radio } from '@material-tailwind/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Task } from '../../model';
import { TaskCard } from './task-card';

export default {
  title: 'Entities/Task/TaskCard',
  component: TaskCard,
} as ComponentMeta<typeof TaskCard>;

const Story: ComponentStory<typeof TaskCard> = (args) => {
  const [status, setStatus] = useState<Task['status']>('active');
  const onChange = (_taskId: Task['id'], status: Task['status']) =>
    setStatus((_) => status);

  return <TaskCard {...args} status={status} onChange={onChange} />;
};

export const Default = Story.bind({});
Default.args = {};
