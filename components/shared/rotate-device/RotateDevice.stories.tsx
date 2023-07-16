import { ComponentStory, ComponentMeta } from '@storybook/react';
import RotateDevice from './RotateDevice';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/RotateDevice',
    component: RotateDevice,
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
} as ComponentMeta<typeof RotateDevice>;

const Template: ComponentStory<typeof RotateDevice> = (args) => <RotateDevice {...args} />;

export const Base = Template.bind({});
