import { ComponentStory, ComponentMeta } from '@storybook/react';
import IconButton, { IIconButton } from './IconButton';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import SvgIcons from '../../../svgs/SvgIcons';

export default {
    title: 'buttons/IconButton',
    component: IconButton,
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
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const TelephoneDark = Template.bind({});
export const TelephoneLight = Template.bind({});
export const LightArrowPrev = Template.bind({});
export const NumberIcon = Template.bind({});

TelephoneDark.args = {
    link: 'tel:799999999',
    children: <SvgIcons id={'tel in a circle'} theme={'dark-grey'} />,
    type: 'link',
} as IIconButton;

TelephoneLight.args = {
    link: 'tel:799999999',
    children: <SvgIcons id={'tel in a circle'} theme={'light'} />,
    type: 'link',
} as IIconButton;

LightArrowPrev.args = {
    children: <SvgIcons id={'arrow next dark small'} />,
    type: 'button',
    func: () => console.log('Hello, world'),
} as IIconButton;

NumberIcon.args = {
    link: 'tel:799999999',
    children: <div>1</div>,
    type: 'number',
} as IIconButton;
