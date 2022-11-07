import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AddTask } from './add-task';

export default {
  title: 'Features/AddTask',
  component: AddTask,
} as ComponentMeta<typeof AddTask>;

const Story: ComponentStory<typeof AddTask> = () => <AddTask />;

export const Default = Story.bind({});
Default.args = {};
