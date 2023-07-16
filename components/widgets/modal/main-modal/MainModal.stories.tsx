import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainModal, { IMainModal } from './MainModal';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';

export default {
    title: 'layouts/MainModal',
    component: MainModal,
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
} as ComponentMeta<typeof MainModal>;

const Template: ComponentStory<typeof MainModal> = (args) => <MainModal {...args} />;

export const Base = Template.bind({});

const ContentModal = () => {
    return (
        <div style={{ padding: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Привет!</span>
        </div>
    );
};

Base.args = {
    iconMobileId: 'close-modal-small-light',
    iconDesktopId: 'close-modal-large-light',
    theme: 'dark',
    show: true,
    closeModal: () => {},
    children: <ContentModal />,
} as IMainModal;
