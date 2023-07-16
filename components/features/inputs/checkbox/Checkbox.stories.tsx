import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox, { ICheckbox } from './Checkbox';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/Checkbox',
    component: Checkbox,
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
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Base = Template.bind({});

Base.args = {
  text: 'Показывать только квартиры по акции',
} as ICheckbox;
