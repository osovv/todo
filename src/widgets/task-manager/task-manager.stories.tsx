import { ComponentMeta, ComponentStory } from '@storybook/react';
import { fork } from 'effector';
import { Provider } from 'effector-react/scope';
import { taskModel } from '~/entities/task';
import { TaskManager } from './task-manager';

export default {
  title: 'Widgets/TaskManager',
  component: TaskManager,
  decorators: [
    (storyFn) => {
      const scope = fork({
        values: [
          [
            taskModel.$tasks,
            [
              {
                id: '1',
                status: 'active',
                title: 'Make a leather wallet',
                description: 'Check YouTube for tutorial',
              },
            ],
          ],
        ],
      });

      return <Provider value={scope}>{storyFn()}</Provider>;
    },
  ],
} as ComponentMeta<typeof TaskManager>;

const Story: ComponentStory<typeof TaskManager> = (args) => {
  return <TaskManager {...args} id='1' />;
};

export const Default = Story.bind({});
Default.args = {};
