import { reatomContext, useCreateCtx } from '@reatom/npm-react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { taskModel } from '~/entities/task';
import { TaskManager } from './task-manager';

export default {
  title: 'Widgets/TaskManager',
  component: TaskManager,
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
} as ComponentMeta<typeof TaskManager>;

const Story: ComponentStory<typeof TaskManager> = (args) => {
  return <TaskManager {...args} id='1' />;
};

export const Default = Story.bind({});
Default.args = {};
