import { ComponentStory, ComponentMeta } from '@storybook/react';
import BlockWrapper, { IBlockWrapper } from './BlockWrapper';
import CheckboxBlock from '../checkbox-block/CheckboxBlock';
import RangeSlider from '../range-slider/RangeSlider';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import React from 'react';
import styles from '../../pages/list/list-form/ListForm.module.scss';
import CheckboxButton from '../../../features/buttons/checkbox-button/CheckboxButton';

export default {
    title: 'Sorting form/BlockWrapper',
    component: BlockWrapper,
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
} as ComponentMeta<typeof BlockWrapper>;

const Template: ComponentStory<typeof BlockWrapper> = (args) => <BlockWrapper {...args} />;

export const WithCheckboxes = Template.bind({});

const params = [
    { name: 'st', value: '0', active: false, disabled: false },
    { name: '1br', value: '1', active: false, disabled: false },
    { name: '2br', value: '2', active: false, disabled: false },
    { name: '3br', value: '3', active: false, disabled: false },
    { name: '4br', value: '4', active: false, disabled: false },
];

const selectParameter = () => {};

WithCheckboxes.args = {
    label: 'Дом',
    children: (
        <CheckboxBlock>
            {params?.map((item) => {
                if (!('empty' in item && item.empty === true)) {
                    return (
                        <div className={styles.button} key={item.value}>
                            <CheckboxButton
                                id={'rooms'}
                                name={item.name}
                                theme={'classic'}
                                value={item.value}
                                active={item.active}
                                selectParameter={selectParameter}
                                disabled={item.disabled}
                                checkboxWithIcon={false}
                                disabledText={'Не в продаже'}
                            />
                        </div>
                    );
                }
            })}
        </CheckboxBlock>
    ),
} as IBlockWrapper;

export const WithRangeSlider = Template.bind({});

WithRangeSlider.args = {
    label: 'Площадь',
    children: (
        <RangeSlider
            slider={'area'}
        />
    ),
} as IBlockWrapper;
