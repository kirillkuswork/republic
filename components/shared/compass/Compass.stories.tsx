import { ComponentStory, ComponentMeta } from '@storybook/react';
import Compass, { ICompass } from './Compass';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/Compass',
    component: Compass,
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
} as ComponentMeta<typeof Compass>;

const Template: ComponentStory<typeof Compass> = (args) => <Compass {...args} />;

export const Base = Template.bind({});

Base.args = {} as ICompass;
