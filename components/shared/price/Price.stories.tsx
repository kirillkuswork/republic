import { ComponentStory, ComponentMeta } from '@storybook/react';
import Price, { IPrice } from './Price';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';
import { flat } from '../../../constants/test-flat';

export default {
    title: 'shared/Price',
    component: Price,
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
} as ComponentMeta<typeof Price>;

const Template: ComponentStory<typeof Price> = (args) => <Price {...args} />;

export const Base = Template.bind({});

Base.args = {
    flat: flat,
    size: 'h5',
} as IPrice;
