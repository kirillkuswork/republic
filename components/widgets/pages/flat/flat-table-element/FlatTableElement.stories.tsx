import { ComponentStory, ComponentMeta } from '@storybook/react';
import FlatTableElement, { IFlatTableElement } from './FlatTableElement';
import { Provider } from 'react-redux';
import { store } from '../../../../../store/reduxStore';
import React from 'react';

export default {
    title: 'shared/FlatTableElement',
    component: FlatTableElement,
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
} as ComponentMeta<typeof FlatTableElement>;

const Template: ComponentStory<typeof FlatTableElement> = (args) => <FlatTableElement {...args} />;

export const Base = Template.bind({});

Base.args = {
    title: 'Этаж',
    children: '13',
} as IFlatTableElement;
