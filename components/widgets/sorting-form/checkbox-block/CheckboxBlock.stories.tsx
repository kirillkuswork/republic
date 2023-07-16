import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store/reduxStore';
import CheckboxBlock, { ICheckboxBlock } from './CheckboxBlock';
import React from 'react';
import styles from '../../pages/list/list-form/ListForm.module.scss';
import CheckboxButton from '../../../features/buttons/checkbox-button/CheckboxButton';

export default {
    title: 'Sorting form/CheckboxBlock',
    component: CheckboxBlock,
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
} as ComponentMeta<typeof CheckboxBlock>;

const Template: ComponentStory<typeof CheckboxBlock> = (args) => <CheckboxBlock {...args} />;

export const Base = Template.bind({});

let params = [
    { name: 'st', value: '0', active: false, disabled: false },
    { name: '1br', value: '1', active: false, disabled: false },
    { name: '2br', value: '2', active: false, disabled: false },
    { name: '3br', value: '3', active: false, disabled: false },
    { name: '4br', value: '4', active: false, disabled: false },
];

const selectParameter = () => {};

Base.args = {
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
    id: 'rooms',
    theme: 'classic',
    description: 'ST— студия, BR (bedroom) — количество спален',
} as ICheckboxBlock;
