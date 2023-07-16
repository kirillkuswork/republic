import { ComponentStory, ComponentMeta } from '@storybook/react';
import SliderHand, { ISliderHand } from './SliderHand';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'shared/SliderHand',
    component: SliderHand,
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
} as ComponentMeta<typeof SliderHand>;

const Template: ComponentStory<typeof SliderHand> = (args) => <SliderHand {...args} />;

export const Base = Template.bind({});

Base.args = {
    position: 'right',
} as ISliderHand;
