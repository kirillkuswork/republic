import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListItem, { IListItem } from './ListItem';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/ListItem',
    component: ListItem,
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
} as ComponentMeta<typeof ListItem>;

const Template: ComponentStory<typeof ListItem> = (args) => <ListItem {...args} />;

export const Base = Template.bind({});

Base.args = {
    // sampleTextProp: 'sampleTextProp',
} as IListItem;
