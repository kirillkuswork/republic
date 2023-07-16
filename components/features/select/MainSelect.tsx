import React, { useEffect, useState } from 'react';
import { IDropdownValue } from '../../../store/slices/catalog/catalogSliceTypes';
import Select, { ActionMeta, MultiValue, OnChangeValue, SingleValue } from 'react-select';
import SvgIcons from '../../svgs/SvgIcons';

export type isMultiType = true | false;

export interface IMainSelect {
    options: IDropdownValue[];
    value: SingleValue<IDropdownValue> | MultiValue<IDropdownValue>;
    isMulti?: isMultiType;
    onChange?: (value: OnChangeValue<IDropdownValue, isMultiType>, action: ActionMeta<IDropdownValue>) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    className?: string;
}

export interface DropdownIndicator {
    id: string;
    theme?: 'white' | 'light' | 'darker-light' | 'grey' | 'dark-grey' | 'brick' | 'brick-light';
}

const DropdownIndicator = ({}) => {
    return <SvgIcons id={'arrow down dark small'} theme={'brick'} />;
};

const MainSelect: React.FC<IMainSelect> = ({ options, value, onChange, className, onBlur, onFocus }) => {
    const [show, setShow] = useState(false);

    //Нужно чтобы пофиксить обращение к document внутри элемента
    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <>
            {show && (
                <Select
                    options={options}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    isSearchable={false}
                    className={className + ' dropdown'}
                    classNamePrefix={'dropdown'}
                    onBlur={onBlur}
                    components={{ DropdownIndicator }}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    menuPortalTarget={document.body}
                />
            )}
        </>
    );
};

export default MainSelect;
