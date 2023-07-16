import { MultiValue } from 'react-select';
import {advantagesType, IFilterParamType, slidersType} from '../../../models';
import { IApiBulk, IApiCatalogFlat } from '../../api/apiTypes';

export type filterRoomsType = { name: string; value: string; active: boolean; disabled: boolean; array: string };
export type benefit = { id: number };

export interface IByCheckbox {
    redPrice: [{ name: string; value: boolean; active: boolean }];
    rooms: IFilterParamType[];
    houseName: IFilterParamType[];
    advantages: advantagesType[];
    finish: advantagesType[];
    // windows: advantagesType[],
}

export interface ISortParameters {
    value: string;
    direction: string;
}

export interface ISortColumns {
    scheme: string;
    rooms: string;
    number: string;
    area: string;
    section_number: string;
    floor: string;
    houseName: string;
    advantages: string;
    finish: string;
    price: string;
}

export interface IFlatsSliceState {
    urls: {
        getResidential: {
            url: string;
            initial: boolean;
            status: 'rejected' | 'fulfilled' | 'pending';
            error: null | 'error';
        };
    };
    filterParameters: {
        byCheckbox: IByCheckbox;
        selectedParams: {
            [key: string]: string;
        };
        params: slidersType[];
        interactedParams: {
            price: {
                min: boolean;
                max: boolean;
            }
            floor: {
                min: boolean;
                max: boolean;
            }
            area: {
                min: boolean;
                max: boolean;
            }
        };
        ableToResetParams: {
            [key: string]: string[],
        };
        inactiveSliders: {
            [key: string]: boolean;
        };
        initialValues: {
            price: (string | number)[];
            area: (string | number)[];
            floor: (string | number)[];
        };
        slidersValues: {
            price: (string | number)[];
            area: (string | number)[];
            floor: (string | number)[];
        };
        slidersExtremeValues: {
            price: (string | number)[];
            area: (string | number)[];
            floor: (string | number)[];
        };
        inputsValues: {
            price: (string | number)[];
            area: (string | number)[];
            floor: (string | number)[];
        };
        advantagesSvgIcons: string[];
        allAdvantages: string[];
    };
    params: ['floor', 'price', 'area'];
    amountSelectedRooms: number;
    amountSelectedHouseName: number;
    amountSelectedAdvantages: number;
    amountSelectedFinish: number;
    amountOfSelectedParams: number;
    amountSelectedRange: {
        floor: number;
        price: number;
        area: number;
    };
    potentialUniqueAttributesFlat: string[];
    sortColumns: ISortColumns;
    sortParameters: ISortParameters;
    dropdownOptions: { value: string; label: string }[];
    selectedOption: IDropdownValue | MultiValue<IDropdownValue>;
    inTableHead: string;
    rangeReduction: boolean;
    countPage: number;
    perPage: number;
    bulks: IApiBulk[];
    currentBulk: string;
    currentBulkId: number;
    currentFloor: number;
    currentFlat: number;
    inForm: string;
    shownFlats: IApiCatalogFlat[];
    allFlats: IApiCatalogFlat[];
    favoriteList: IApiCatalogFlat[];
    filteredByCheckboxFlats: IApiCatalogFlat[];
    freeFlatsId: string[];
    isFiltered: boolean | null;
    currentAdvantages: advantagesType[] | [];
    flatStatus: {
        free: string;
        reserve: string;
    };
    onlyPromo: boolean | undefined;
}

export type THouseName = 'silver' | 'brown' | 'green' | 'gold' | 'platinum' | 'whites' | 'reds' | 'purple';

export interface IDropdownValue {
    value: string;
    label: string;
}
