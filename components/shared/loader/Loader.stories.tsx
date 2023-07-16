import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader, { ILoader } from './Loader';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'shared/Loader',
    component: Loader,
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
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Base = Template.bind({});

Base.args = {
    isLoading: false,
} as ILoader;
