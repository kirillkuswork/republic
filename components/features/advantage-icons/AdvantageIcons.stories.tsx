import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AdvantageIcons, IAdvantageIcons } from './AdvantageIcons';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';
import { flat } from '../../../constants/test-flat';

export default {
    title: 'shared/AdvantageIcons',
    component: AdvantageIcons,
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
} as ComponentMeta<typeof AdvantageIcons>;

const Template: ComponentStory<typeof AdvantageIcons> = (args) => <AdvantageIcons {...args} />;

export const Base = Template.bind({});

Base.args = {
    flat: flat,
    theme: 'dark-grey',
} as IAdvantageIcons;
