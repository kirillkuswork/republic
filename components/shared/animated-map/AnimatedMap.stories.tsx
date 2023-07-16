import { ComponentStory, ComponentMeta } from '@storybook/react';
import AnimatedMap, { IAnimatedMap } from './AnimatedMap';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/AnimatedMap',
    component: AnimatedMap,
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
} as ComponentMeta<typeof AnimatedMap>;

const Template: ComponentStory<typeof AnimatedMap> = (args) => <AnimatedMap {...args} />;

export const Base = Template.bind({});

Base.args = {} as IAnimatedMap;
