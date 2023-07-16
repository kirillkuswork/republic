import { ComponentStory, ComponentMeta } from '@storybook/react';
import Slider from './SliderProgress';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';
import { LightCard } from '../cards/simple-card/SimpleCard.stories';

export default {
    title: 'templates/Slider',
    component: Slider,
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
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Base = Template.bind({});

Base.args = {
    size: 'content',
    arrow: true,
    children: [
        <LightCard theme='light' style={{ width: '300px', height: '200px' }} />,
        <LightCard theme='light' style={{ width: '300px', height: '200px' }} />,
    ],
};
