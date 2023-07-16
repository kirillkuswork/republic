import { ComponentStory, ComponentMeta } from '@storybook/react';
import AsideModalMobile, { IAsideModalMobile } from './AsideModalMobile';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import ImageModalCard from '../../cards/image-modal-card/ImageModalCard';
import DeadlineMessage from '../../../shared/deadline-message/DeadlineMessage';

export default {
    title: 'layouts/AsideModalMobile',
    component: AsideModalMobile,
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
} as ComponentMeta<typeof AsideModalMobile>;

const Template: ComponentStory<typeof AsideModalMobile> = (args) => <AsideModalMobile {...args} />;

export const Base = Template.bind({});

Base.args = {
    show: true,
    title: 'title',
    text: 'text',
    number: '3',
    img: 'img',
    bgColor: 'light',
} as IAsideModalMobile;
