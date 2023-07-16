import { ComponentStory, ComponentMeta } from '@storybook/react';
import NumberSlider, { INumberSlider } from './NumberSlider';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import { slidersType } from '../../../../models';

export default {
    title: 'Sorting form/NumberSlider',
    component: NumberSlider,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
} as ComponentMeta<typeof NumberSlider<slidersType>>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NumberSlider<slidersType>> = (args) => <NumberSlider {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const onChangeSlider = (slider: slidersType, values: number[]) => {};

const onUpdateSlider = (slider: slidersType, values: number[]) => {};

Base.args = {
    min: '50',
    max: '1000',
    start: '60',
    step: 1,
    slider: 'floor',
    units: '',
    textValue: '300',
    onChangeSlider: onChangeSlider,
    onUpdateSlider: onUpdateSlider,
} as INumberSlider<slidersType>;
