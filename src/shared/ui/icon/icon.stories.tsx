import { ComponentMeta, ComponentStory } from '@storybook/react';
import { allIconNames, Icon } from './icon';

export default {
  title: 'UI/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: allIconNames,
    },
    size: {
      control: 'radio',
      defaultValue: '4',
      options: ['3', '4', '5', '6'],
    },
  },
} as ComponentMeta<typeof Icon>;

const Story: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const PlayIcon = Story.bind({});
PlayIcon.args = { name: 'PlayIcon' };
