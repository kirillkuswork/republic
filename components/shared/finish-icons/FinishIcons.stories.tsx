import { ComponentStory, ComponentMeta } from '@storybook/react';
import FinishIcons, { IFinishIcons } from './FinishIcons';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';
import { flat } from '../../../constants/test-flat';

export default {
    title: 'shared/FinishIcons',
    component: FinishIcons,
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
} as ComponentMeta<typeof FinishIcons>;

const Template: ComponentStory<typeof FinishIcons> = (args) => <FinishIcons {...args} />;

export const Base = Template.bind({});

Base.args = {
    flat: flat,
    theme: 'dark-grey',
    withTooltip: true,
} as IFinishIcons;
