import { ComponentStory, ComponentMeta } from '@storybook/react';
import DeadlineMessage, { IDeadlineMessage } from './DeadlineMessage';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'shared/DeadlineMessage',
    component: DeadlineMessage,
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
} as ComponentMeta<typeof DeadlineMessage>;

const Template: ComponentStory<typeof DeadlineMessage> = (args) => <DeadlineMessage {...args} />;

export const Base = Template.bind({});

Base.args = {
    text: 'Выдача ключей',
    date: 'IV кв.2025',
    theme: 'dark',
} as IDeadlineMessage;
