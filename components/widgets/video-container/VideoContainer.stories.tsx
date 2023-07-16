import { ComponentStory, ComponentMeta } from '@storybook/react';
import VideoContainer, { IVideoContainer } from './VideoContainer';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/VideoContainer',
    component: VideoContainer,
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
} as ComponentMeta<typeof VideoContainer>;

const Template: ComponentStory<typeof VideoContainer> = (args) => <VideoContainer {...args} />;

export const Base = Template.bind({});

Base.args = {
    isPaused: true,
    video: {
        file: 'http://republic-new.keep-calm.ru/public/progress/64157953227a4ee917ec7cf5/Forma Portland 27.02-2.mov',
        type: 'video/quicktime',
    },
} as IVideoContainer;
