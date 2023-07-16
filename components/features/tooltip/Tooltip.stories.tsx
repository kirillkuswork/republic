import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip, { ITooltip } from './Tooltip';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import SvgIcons from '../../svgs/SvgIcons';
import React from 'react';

export default {
    title: 'features/Tooltip',
    component: Tooltip,
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
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Base = Template.bind({});

Base.args = {
    behavior: 'hover',
    children: <SvgIcons id='whiteBox' theme={'brick-light'} />,
    content: 'Без отделки',
    theme: 'base',
} as ITooltip;
