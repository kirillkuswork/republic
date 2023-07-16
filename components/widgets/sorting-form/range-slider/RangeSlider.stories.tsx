import { ComponentStory, ComponentMeta } from '@storybook/react';
import RangeSlider, { IRangeSlider } from './RangeSlider';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import { slidersType } from '../../../../models';

export default {
    title: 'Sorting form/RangeSlider',
    component: RangeSlider,
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
} as ComponentMeta<typeof RangeSlider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RangeSlider> = (args) => <RangeSlider {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    slider: 'floor',
    units: '',
} as IRangeSlider;
