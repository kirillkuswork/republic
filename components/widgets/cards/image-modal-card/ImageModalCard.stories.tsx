import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImageImageModalCard, { IImageModalCard } from './ImageModalCard';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';

export default {
    title: 'cards/ImageModalCard',
    component: ImageImageModalCard,
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
} as ComponentMeta<typeof ImageImageModalCard>;

const Template: ComponentStory<typeof ImageImageModalCard> = (args) => <ImageImageModalCard {...args} />;

export const Base = Template.bind({});

Base.args = {
    src: '/images/visual/reds.jpg',
    text: 'REDS',
    textStyle: 'h3',
} as IImageModalCard;
