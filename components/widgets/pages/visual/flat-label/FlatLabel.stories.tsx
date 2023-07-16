import { ComponentStory, ComponentMeta } from '@storybook/react';
import FlatLabel, { IFlatLabel } from './FlatLabel';
import React from 'react';

export default {
    title: 'templates/FlatLabel',
    component: FlatLabel,
    argTypes: {},
    decorators: [
        () => (
            <div className={'decorator'}>
                <div></div>
            </div>
        ),
    ],
} as ComponentMeta<typeof FlatLabel>;

const Template: ComponentStory<typeof FlatLabel> = (args) => <FlatLabel {...args} />;

export const Base = Template.bind({});

Base.args = {
    text: 'sampleTextProp',
} as IFlatLabel;
