import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header, { IHeader } from './Header';

export default {
    title: 'layouts/Header',
    component: Header,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        options: ['dark', 'light', 'dark-light'],
        control: {
            type: 'radio',
        },
    },
} as ComponentMeta<typeof Header>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Dark = Template.bind({});
export const Light = Template.bind({});
export const DarkLight = Template.bind({});
export const Transparent = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Dark.args = {
    theme: 'dark',
} as IHeader;

Light.args = {
    theme: 'light',
} as IHeader;

DarkLight.args = {
    theme: 'dark-light',
} as IHeader;

Transparent.args = {
    theme: 'transparent',
} as IHeader;
