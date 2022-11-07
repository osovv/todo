import { ComponentMeta, ComponentStory } from '@storybook/react';
import { fork } from 'effector';
import { Provider } from 'effector-react/scope';
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
  decorators: [
    (storyFn) => {
      const scope = fork();

      return <Provider value={scope}>{storyFn()}</Provider>;
    },
  ],
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
