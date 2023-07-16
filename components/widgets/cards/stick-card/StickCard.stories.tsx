import { ComponentStory, ComponentMeta } from '@storybook/react';
import StickCard from './StickCard';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';

export default {
    title: 'cards/StickCard',
    component: StickCard,
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
} as ComponentMeta<typeof StickCard>;

const Template: ComponentStory<typeof StickCard> = (args) => <StickCard {...args} />;

export const Base = Template.bind({});

Base.args = {
    children: <p>Sample text in StickCard</p>,
};
