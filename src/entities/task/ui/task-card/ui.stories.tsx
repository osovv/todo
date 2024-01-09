import { reatomContext, useCreateCtx } from '@reatom/npm-react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { taskModel } from '../..';
import { TaskCard } from './ui';

export default {
  title: 'Entities/Task/TaskCard',
  component: TaskCard,
  decorators: [
    (storyFn) => {
      const ctx = useCreateCtx((ctx) => {});

      taskModel.tasksAtom(ctx, [
        {
          id: '1',
          status: 'active',
          title: 'Make a leather wallet',
          description: 'Check YouTube for tutorial',
        },
      ]);

      return (
        <reatomContext.Provider value={ctx}>{storyFn()}</reatomContext.Provider>
      );
    },
  ],
} as ComponentMeta<typeof TaskCard>;

const Story: ComponentStory<typeof TaskCard> = (args) => {
  return <TaskCard {...args} id='1' />;
};

export const Default = Story.bind({});
Default.args = {};
