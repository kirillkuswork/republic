import { ComponentStory, ComponentMeta } from '@storybook/react';
import FormaLogo from './FormaLogo';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'SVG/FormaLogo',
    component: FormaLogo,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
} as ComponentMeta<typeof FormaLogo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormaLogo> = () => <FormaLogo />;

export const SVG = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
