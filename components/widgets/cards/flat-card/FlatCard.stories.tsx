import { ComponentStory, ComponentMeta } from '@storybook/react';
import FlatCard, { IFlatCard } from './FlatCard';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import { flat } from '../../../../constants/test-flat';

export default {
    title: 'cards/FlatCard',
    component: FlatCard,
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
} as ComponentMeta<typeof FlatCard>;

const Template: ComponentStory<typeof FlatCard> = (args) => <FlatCard {...args} />;

export const Base = Template.bind({});

Base.args = {
    flat: flat,
} as IFlatCard;
