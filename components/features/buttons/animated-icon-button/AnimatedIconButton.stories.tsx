import { ComponentStory, ComponentMeta } from '@storybook/react';
import AnimatedIconButton, { IAnimatedIconButton } from './AnimatedIconButton';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import SvgIcons from '../../../svgs/SvgIcons';

export default {
    title: 'buttons/AnimatedIconButton',
    component: AnimatedIconButton,
    argTypes: {},
    decorators: [
        (story) => (
            <div className={'decorator'}>
                <div>
                    <Provider store={store}>{story()}</Provider>
                </div>
            </div>
        ),
    ],
} as ComponentMeta<typeof AnimatedIconButton>;

const Template: ComponentStory<typeof AnimatedIconButton> = (args) => <AnimatedIconButton {...args} />;

export const RoundButton = Template.bind({});
export const RoundLeftOutlineButton = Template.bind({});
export const RoundRightOutlineButton = Template.bind({});
export const RoundWhiteBrickOutlineButton = Template.bind({});
export const RoundLikeButton = Template.bind({});
export const RoundCloseButton = Template.bind({});
export const RoundSmallButton = Template.bind({});
export const SquareOutlineButton = Template.bind({});

RoundButton.args = {
    type: 'button',
    variant: 'round',
    outline: false,
    color: 'white',
    direction: 'down',
    children: <SvgIcons id={'arrow down'} />,
} as IAnimatedIconButton;

RoundLeftOutlineButton.args = {
    type: 'button',
    variant: 'round',
    outline: true,
    color: 'dark-grey-brick',
    direction: 'left',
    children: <SvgIcons id={'arrow left'} />,
} as IAnimatedIconButton;

RoundSmallButton.args = {
    type: 'button',
    variant: 'round',
    outline: false,
    size: 'small',
    color: 'dark-grey-brick',
    direction: 'left',
    children: <SvgIcons id={'close'} />,
} as IAnimatedIconButton;

RoundRightOutlineButton.args = {
    type: 'button',
    variant: 'round',
    outline: true,
    color: 'dark-grey-brick',
    direction: 'right',
    children: <SvgIcons id={'arrow right'} />,
} as IAnimatedIconButton;

RoundWhiteBrickOutlineButton.args = {
    type: 'button',
    variant: 'round',
    outline: true,
    color: 'white-brick',
    direction: 'up',
    children: <SvgIcons id={'vk logo'} />,
} as IAnimatedIconButton;

RoundLikeButton.args = {
    type: 'button',
    variant: 'round',
    outline: false,
    color: 'brick',
    direction: 'up',
    children: <SvgIcons id={'heart'} />,
} as IAnimatedIconButton;

RoundCloseButton.args = {
    type: 'button',
    variant: 'round',
    outline: false,
    color: 'dark-grey-brick',
    direction: 'up',
    children: <SvgIcons id={'close'} />,
} as IAnimatedIconButton;

SquareOutlineButton.args = {
    type: 'button',
    variant: 'square',
    outline: true,
    color: 'dark-grey-brick',
    direction: 'up',
    children: <SvgIcons id={'close'} />,
} as IAnimatedIconButton;
