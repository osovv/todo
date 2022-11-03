import { ComponentMeta, ComponentStory } from '@storybook/react';
import { App } from './app';

export default {
  title: 'Example/App',
  component: App,
} as ComponentMeta<typeof App>;

const Story: ComponentStory<typeof App> = () => <App />;

export const Default = Story.bind({});
Default.args = {};
