import { ComponentMeta, ComponentStory } from '@storybook/react';
import { fork } from 'effector';
import { Provider } from 'effector-react/scope';
import { $tasks } from '../../model';
import { TaskCard } from './ui';

export default {
  title: 'Entities/Task/TaskCard',
  component: TaskCard,
  decorators: [
    (storyFn) => {
      const scope = fork({
        values: [
          [
            $tasks,
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
} as ComponentMeta<typeof TaskCard>;

const Story: ComponentStory<typeof TaskCard> = (args) => {
  return <TaskCard {...args} id='1' />;
};

export const Default = Story.bind({});
Default.args = {};
