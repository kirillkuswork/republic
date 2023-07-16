import { ComponentStory, ComponentMeta } from '@storybook/react';
import DescriptionCard, { IDescriptionCard } from './DescriptionCard';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import { flat } from '../../../../constants/test-flat';

export default {
    title: 'cards/FlatCard',
    component: DescriptionCard,
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
} as ComponentMeta<typeof DescriptionCard>;

const Template: ComponentStory<typeof DescriptionCard> = (args) => <DescriptionCard {...args} />;

export const Base = Template.bind({});

Base.args = {
    flat: flat,
} as IDescriptionCard;
