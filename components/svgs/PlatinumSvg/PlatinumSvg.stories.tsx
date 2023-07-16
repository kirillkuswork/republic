import { ComponentStory, ComponentMeta } from '@storybook/react';
import PlatinumSvg, { IPlatinumSvg } from './PlatinumSvg';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/PlatinumSvg',
    component: PlatinumSvg,
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
} as ComponentMeta<typeof PlatinumSvg>;

const Template: ComponentStory<typeof PlatinumSvg> = (args) => <PlatinumSvg {...args} />;

export const Base = Template.bind({});

Base.args = {} as IPlatinumSvg;
