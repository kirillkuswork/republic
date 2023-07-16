import { ComponentStory, ComponentMeta } from '@storybook/react';
import SliderFullwidth, { ISliderFullwidth } from './SliderFullwidth';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/SliderFullwidth',
    component: SliderFullwidth,
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
} as ComponentMeta<typeof SliderFullwidth>;

const Template: ComponentStory<typeof SliderFullwidth> = (args) => <SliderFullwidth {...args} />;

export const Base = Template.bind({});

Base.args = {
    images: [],
} as ISliderFullwidth;
