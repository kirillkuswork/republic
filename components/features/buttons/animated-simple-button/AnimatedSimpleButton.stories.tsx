import { ComponentStory, ComponentMeta } from '@storybook/react';
import AnimatedSimpleButton, { IAnimatedSimpleButton } from './AnimatedSimpleButton';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import SvgIcons from '../../../svgs/SvgIcons';
import { width } from 'dom7';

export default {
    title: 'buttons/AnimatedSimpleButton',
    component: AnimatedSimpleButton,
    argTypes: {},
    decorators: [
        (story) => (
            <div className={'decorator'}>
                <Provider store={store}>{story()}</Provider>
            </div>
        ),
    ],
} as ComponentMeta<typeof AnimatedSimpleButton>;

const Template: ComponentStory<typeof AnimatedSimpleButton> = (args) => <AnimatedSimpleButton {...args} />;

export const LightOutlineButton = Template.bind({});
LightOutlineButton.args = {
    text: 'О ДОМЕ',
    withIcon: true,
    theme: 'light-outline',
    children: <SvgIcons id={'arrow right'} />,
} as IAnimatedSimpleButton;

export const DarkOutlineButton = Template.bind({});
DarkOutlineButton.args = {
    text: 'РАСПОЛОЖЕНИЕ',
    withIcon: true,
    theme: 'dark-outline',
    children: <SvgIcons id={'arrow right'} />,
} as IAnimatedSimpleButton;

export const LighGreyOutlineButton = Template.bind({});
LighGreyOutlineButton.args = {
    text: 'РАСПОЛОЖЕНИЕ',
    withIcon: true,
    theme: 'light-grey-outline',
    children: <SvgIcons id={'arrow right'} />,
} as IAnimatedSimpleButton;

export const BrickFilledButton = Template.bind({});
BrickFilledButton.args = {
    text: 'РАСПОЛОЖЕНИЕ',
    withIcon: true,
    theme: 'brick-filled',
    children: <SvgIcons id={'arrow right'} />,
} as IAnimatedSimpleButton;
