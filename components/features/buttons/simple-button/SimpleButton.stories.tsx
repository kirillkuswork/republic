import { ComponentStory, ComponentMeta } from '@storybook/react';
import SimpleButton, { ISimpleButton } from './SimpleButton';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import SvgIcons from '../../../svgs/SvgIcons';
import ROUTES from '../../../../constants/routes';

export default {
    title: 'buttons/SimpleButton',
    component: SimpleButton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    control: {
        type: 'radio',
    },
    decorators: [
        (story) => (
            <div className={'decorator'}>
                <div>
                    <Provider store={store}>{story()}</Provider>
                </div>
            </div>
        ),
    ],
} as ComponentMeta<typeof SimpleButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SimpleButton> = (args) => <SimpleButton {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const OutlineDarkButton = Template.bind({});
export const OutlineLightButton = Template.bind({});
export const WithIconButton = Template.bind({});
export const HeaderButton = Template.bind({});

OutlineDarkButton.args = {
    text: 'Расположение',
    type: 'button',
    color: 'dark-grey',
    outline: true,
    size: 'mini',
};

OutlineLightButton.args = {
    text: 'Расположение',
    type: 'button',
    color: 'light',
    outline: true,
    size: 'mini',
};

WithIconButton.args = {
    text: 'фильтр',
    type: 'button',
    color: 'brick',
    size: 'medium',
    children: <SvgIcons id={'arrow down dark small'} theme={'light'} />,
};

HeaderButton.args = {
    text: 'Квартиры',
    type: 'Link',
    size: 'default',
    color: 'light',
    outline: true,
    link: ROUTES.list,
    children: <SvgIcons id={'arrow down dark small'} theme={'light'} />,
};
