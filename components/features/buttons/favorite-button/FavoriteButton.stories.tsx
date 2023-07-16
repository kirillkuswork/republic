import { ComponentStory, ComponentMeta } from '@storybook/react';
import FavoriteButton, { IFavoriteButton } from './FavoriteButton';
import { useAppSelector } from '../../../../hook';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import { flat } from '../../../../constants/test-flat';

export default {
    title: 'buttons/FavoriteButton',
    component: FavoriteButton,
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
} as ComponentMeta<typeof FavoriteButton>;

const Template: ComponentStory<typeof FavoriteButton> = (args) => <FavoriteButton {...args} />;

export const Base = Template.bind({});

Base.args = {
    flat: flat,
} as IFavoriteButton;
