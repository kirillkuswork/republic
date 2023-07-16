import { ComponentStory, ComponentMeta } from '@storybook/react';
import RedPrice, { IRedPrice } from './RedPrice';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';
import { redPriceFlat } from '../../../constants/test-flat';

export default {
    title: 'shared/RedPrice',
    component: RedPrice,
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
} as ComponentMeta<typeof RedPrice>;

const Template: ComponentStory<typeof RedPrice> = (args) => <RedPrice {...args} />;

export const Base = Template.bind({});

Base.args = {
    flat: redPriceFlat,
    tooltip: true,
    size: 'h4',
    tooltipTheme: 'red_price_catalog',
} as IRedPrice;
