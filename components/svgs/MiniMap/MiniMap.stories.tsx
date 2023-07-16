import { ComponentStory, ComponentMeta } from '@storybook/react';
import MiniMap, { IMiniMap } from './MiniMap';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'SVGmap/MiniMap',
    component: MiniMap,
    argTypes: {},
    decorators: [
        (story) => (
            <div className={'decorator'}>
                <Provider store={store}>{story()}</Provider>
            </div>
        ),
    ],
} as ComponentMeta<typeof MiniMap>;

const Template: ComponentStory<typeof MiniMap> = (args) => <MiniMap {...args} />;

export const Base = Template.bind({});

Base.args = {
    houseName: 'reds',
} as IMiniMap;
