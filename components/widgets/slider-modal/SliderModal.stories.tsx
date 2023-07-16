import { ComponentStory, ComponentMeta } from '@storybook/react';
import SliderModal, { ISliderModal } from './SliderModal';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';
import { LightCard } from '../cards/simple-card/SimpleCard.stories';

export default {
    title: 'templates/SliderModal',
    component: SliderModal,
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
} as ComponentMeta<typeof SliderModal>;

const Template: ComponentStory<typeof SliderModal> = (args) => <SliderModal {...args} />;

export const Base = Template.bind({});

Base.args = {
    isOpen: true,
    arrow: true,
    isLoop: true,
    isKeyboardEnabled: true,
    firstSlide: 0,
    photos: [
        'https://republic-new.keep-calm.ru/public/slider/63d7adcfe61aa76e7fde1026/parking-republic.png',
        'https://republic-new.keep-calm.ru/public/slider/63d7adcfe61aa76e7fde1026/parking-4.jpeg',
        'https://republic-new.keep-calm.ru/public/slider/63d7adcfe61aa76e7fde1026/parking-3.jpeg',
        'https://republic-new.keep-calm.ru/public/slider/63d7adcfe61aa76e7fde1026/parking-2.jpeg',
        'https://republic-new.keep-calm.ru/public/slider/63d7adcfe61aa76e7fde1026/parking-1.jpeg',
    ],
};
