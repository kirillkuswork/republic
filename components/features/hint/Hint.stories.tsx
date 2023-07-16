import { ComponentStory, ComponentMeta } from '@storybook/react';
import Hint, { IHint } from './Hint';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/Hint',
    component: Hint,
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
} as ComponentMeta<typeof Hint>;

const Template: ComponentStory<typeof Hint> = (args) => <Hint {...args} />;

export const Base = Template.bind({});

Base.args = {
    children: <div>Привет</div>,
} as IHint;
