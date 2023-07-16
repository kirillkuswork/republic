import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainLoader from './MainLoader';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/MainLoader',
    component: MainLoader,
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
} as ComponentMeta<typeof MainLoader>;

const Template: ComponentStory<typeof MainLoader> = (args) => <MainLoader {...args} />;

export const Base = Template.bind({});
