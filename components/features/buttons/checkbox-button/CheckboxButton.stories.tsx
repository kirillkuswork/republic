import { ComponentStory, ComponentMeta } from '@storybook/react';
import CheckboxButton, { ICheckboxButton } from './CheckboxButton';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';

export default {
    title: 'buttons/CheckboxButton',
    component: CheckboxButton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        options: ['classic', 'classic'],
        control: {
            type: 'radio',
        },
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
} as ComponentMeta<typeof CheckboxButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckboxButton> = (args) => <CheckboxButton {...args} />;

export const Base = Template.bind({});
export const WithIcons = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    id: '',
    name: 'reds',
    value: 'reds',
    active: false,
    disabled: false,
    theme: 'classic',
    disabledText: 'Не в продаже',
} as ICheckboxButton;

WithIcons.args = {
    id: '',
    name: 'white box',
    //Иконка должна быть добавлена в FormaLogo.stories.tsx
    value: 'whiteBox',
    icon: 'whiteBox',
    active: false,
    disabled: false,
    disabledText: 'Не в продаже',
    theme: 'classic',
    locationIcon: 'before',
    checkboxWithIcon: true,
    themeIcon: 'light',
} as ICheckboxButton;
