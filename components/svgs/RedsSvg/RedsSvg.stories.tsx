import { ComponentStory, ComponentMeta } from '@storybook/react';
import RedsSvg, { IRedsSvg } from './RedsSvg';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/RedsSvg',
    component: RedsSvg,
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
} as ComponentMeta<typeof RedsSvg>;

const Template: ComponentStory<typeof RedsSvg> = (args) => <RedsSvg {...args} />;

export const Base = Template.bind({});

Base.args = {} as IRedsSvg;
