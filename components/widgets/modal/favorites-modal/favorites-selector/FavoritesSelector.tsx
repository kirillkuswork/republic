import React, { useEffect, useState } from 'react';
import styles from './FavoritesSelector.module.scss';
import MainSelect from '../../../../features/select/MainSelect';
import { MultiValue, SingleValue } from 'react-select';
import { IDropdownValue } from '../../../../../store/slices/catalog/catalogSliceTypes';
import { changeSelectedDropdownOption, sortFlatsListByDropdown } from '../../../../../store/slices/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hook';

export interface IFavoritesSelector {
    sort: string;
}

const FavoritesSelector: React.FC<IFavoritesSelector> = ({}) => {
    const dispatch = useAppDispatch();
    const dropdownOptions = useAppSelector((state) => state.catalogPage.dropdownOptions);
    const selectedOption = useAppSelector((state) => state.catalogPage.selectedOption);
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);

    const handleBlur = () => {
        setIsDropdownOpened(false);
    };

    const handleFocus = () => {
        setIsDropdownOpened(true);
    };

    const handleChange = (selectedOption: SingleValue<IDropdownValue> | MultiValue<IDropdownValue>) => {
        if (!selectedOption) return;
        dispatch(changeSelectedDropdownOption(selectedOption));
    };

    useEffect(() => {
        if (selectedOption) {
            dispatch(sortFlatsListByDropdown({ value: selectedOption, array: 'favoriteList' }));
        }
    }, [selectedOption]);

    return (
        <MainSelect
            options={dropdownOptions}
            value={selectedOption}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`type2 ${styles.dropdown} ${isDropdownOpened ? styles.dropdown__opened : ''}`}
        />
    );
};

export default FavoritesSelector;
