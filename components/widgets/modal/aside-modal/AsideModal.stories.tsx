import { ComponentStory, ComponentMeta } from '@storybook/react';
import AsideModal, { IAsideModal } from './AsideModal';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import ImageModalCard from '../../cards/image-modal-card/ImageModalCard';
import DeadlineMessage from '../../../shared/deadline-message/DeadlineMessage';

export default {
    title: 'layouts/AsideModal',
    component: AsideModal,
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
} as ComponentMeta<typeof AsideModal>;

const Template: ComponentStory<typeof AsideModal> = (args) => <AsideModal {...args} />;

export const Base = Template.bind({});

Base.args = {
    show: true,
    childrenTop: <ImageModalCard src={'/images/visual/reds.jpg'} text={'REDS'} textStyle={'h3'} />,
    childrenBottom1: <div>Просто какой-то текст</div>,
    childrenBottom2: <DeadlineMessage text={'Выдача ключей'} date={'сегодня!'} theme={'dark'} />,
    direction: 'left',
    bgColor: 'light',
} as IAsideModal;
