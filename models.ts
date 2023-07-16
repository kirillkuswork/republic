export interface IFilterParamType {
    name: string;
    value: string;
    active: boolean;
    disabled: boolean;
    icon?: string;
}
export type advantagesType = { name: string; value: string; active: boolean; empty: boolean | null; icon?: string; disabled: boolean };

export type slidersType = 'floor' | 'area' | 'price';

export type checkboxesType = 'rooms' | 'houseName' | 'advantages' | 'finish'

export interface IUpdateFilterValues {
    slider: slidersType;
    values: number[];
}

export interface ICheckbox {
    id: string;
    value: boolean | string;
}

export interface ISortFlats {
    array: string;
    value: string;
    placeCall: string;
}
