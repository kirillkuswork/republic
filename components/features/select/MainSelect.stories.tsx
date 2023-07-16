import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainSelect, { IMainSelect } from './MainSelect';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { IDropdownValue } from '../../../store/slices/catalog/catalogSliceTypes';

export default {
    title: 'features/MainSelect',
    component: MainSelect,
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
} as ComponentMeta<typeof MainSelect>;

const Template: ComponentStory<typeof MainSelect> = (args) => <MainSelect {...args} />;

export const Base = Template.bind({});

let dropdownOptions = [
    { value: 'asc-price', label: 'По возрастанию цены' },
    { value: 'dec-price', label: 'По убыванию цены' },
    { value: 'asc-rooms', label: 'По возрастанию числа спален' },
    { value: 'dec-rooms', label: 'По убыванию числа спален' },
    { value: 'asc-area', label: 'По возрастанию площади' },
    { value: 'dec-area', label: 'По убыванию площади' },
    { value: 'asc-floor', label: 'По возрастанию этажа' },
    { value: 'dec-floor', label: 'По убыванию этажа' },
    { value: 'asc-houseName', label: 'По домам от A до Z' },
    { value: 'dec-houseName', label: 'По домам от Z до A' },
    { value: 'asc-number', label: 'По возрастанию номера' },
    { value: 'dec-number', label: 'По убыванию номера' },
    { value: 'with-whitebox', label: 'Сначала с White Box' },
    { value: 'without-whitebox', label: 'Сначала без отделки' },
];
let value = { value: 'asc-price', label: 'По возрастанию цены' };

const handleBlur = () => {};

const handleFocus = () => {};

const handleChange = (selectedOption: SingleValue<IDropdownValue> | MultiValue<IDropdownValue>) => {
    if (!selectedOption) return;
};

Base.args = {
    options: dropdownOptions,
    value: value,
    onChange: handleChange,
    className: 'type1',
    onBlur: handleBlur,
    onFocus: handleFocus,
} as IMainSelect;
