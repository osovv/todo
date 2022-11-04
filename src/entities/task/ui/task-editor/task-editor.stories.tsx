import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TaskEditor } from './task-editor';

export default {
  title: 'Entities/Task/TaskEditor',
  component: TaskEditor,
  argTypes: {
    onClose: { action: 'onClose' },
    onSubmit: { action: 'onSubmit' },
    submitButtonText: {
      control: 'text',
    },
  },
  args: {
    submitButtonText: 'Add task',
  },
} as ComponentMeta<typeof TaskEditor>;

const Story: ComponentStory<typeof TaskEditor> = (args) => {
  return <TaskEditor {...args} />;
};

export const Filled = Story.bind({});
Filled.args = {
  title: 'Make a leather wallet',
  description: 'Check YouTube for tutorial',
};

export const Empty = Story.bind({});
Empty.args = {};
