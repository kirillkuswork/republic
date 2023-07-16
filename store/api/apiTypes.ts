import { THouseName } from '../slices/catalog/catalogSliceTypes';

export interface IApiCatalog {
    block: {
        id: number;
        name: string;
        longitude: number;
        latitude: number;
        address: string;
    };
    price: {
        min: number;
        max: number;
    };
    area: {
        min: number;
        max: number;
    };
    flats: IApiCatalogFlat[];
    bulks: IApiBulk[];
}

export interface IApiCatalogFlat {
    id: number;
    number: string;
    area: number;
    attributes: { [key: string]: boolean | 'undefined' };
    floor: number;
    guid: string;
    real_price: number;
    currentPrice: number;
    price: string;
    rooms: string | number;
    section: {
        id: number;
        number: number;
        floorsCount: number;
    };
    layout: {
        flat_plan_png: string;
    };
    bulk: {
        building_status: number;
        houseName: string;
        id: number;
        keyDate: string;
        name: string;
        number: number;
        settlement_date: string;
        settlement_quarter: number;
        settlement_year: number;
    };
    houseName: string;
    bulk_id: number;
    status: string;
    bookingStatus: string;
    has_advertising_price: number;
    similar: IApiCatalogFlat[];
    mainBenefit: {
        id: number;
        guid: string;
        name: string;
        description: string;
        benefitPrice: number;
        priceMeter: number;
        maxPrice: number | null;
        discount: number | null;
        discountPercent: number | null;
        isMain: boolean;
        isFamily: boolean;
        isReplacingStandardPrice: boolean;
        mortgage: any;
    };
    redPrice: boolean;
    promo?: boolean;
}

export interface IApiBulk {
    houseName: THouseName;
    id: number;
    latitude: null;
    longitude: null;
    max_price: number;
    min_price: number;
    name: string;
    settlement_date: string;
    type_id: number;
    keyDate: string;
    flatsCount: number;
}

export interface IApiTerms {
    _id: string;
    nameItem: string;
    title: string;
    description: Array<{
        title: string;
        item: string;
    }>;
    __v: number;
}

export interface IApiTermsQA {
    _id: string;
    name: string;
    qa_html_quest: string;
    qa_category: {
        _id: string;
        qa_category_name: string;
        qa_category_html_name: string;
        __v: number;
    };
    qa_html_answer: string;
    is_faq?: boolean;
    __v: number;
}

export interface IApiTermsCalcData {
    _id: string;
    title: string;
    bank: {
        _id: string;
        title: string;
        __v: number;
        imgUrl: string;
        mimeType: string;
    };
    mortgage_type: {
        _id: string;
        mortgage_type_name: string;
        __v: number;
    };
    mortgage_an_initial_fee: string;
    mortgage_rate: string;
    mortgage_time: string;
    mortgage_max_sum: string;
    mortgage_activation_date: string;
    mortgage_disable: boolean;
    mortgage_minus_one_year: boolean;
    __v: number;
}

export interface IApiSlider {
    absolutePath: string[];
    bucket: string[];
    descriptions: string[];
    fullUrl: string;
    key: string[];
    mime: string[];
    size: number[];
    slug: string;
    title: string;
    __v: number;
    _id: number;
}
export interface IApiNews {
    _id: string;
    title: string;
    type: string;
    createdAt: string;
    content: string;
    slug: string;
    fileUrl: string;
    mimeType: string;
    subtitle: string;
    fullUrl: string;
    galleryUrl: [];
    __v: number;
}

export interface IApiFlatCheck {
    [key: string]: boolean;
}

export interface IApiProgress {
    _id: string;
    title: string;
    fileUrl: string[];
    mimeType: string[];
    preViewVideo?: string | null;
    slug: string;
    text: string;
    __v: number;
}
export interface IApiGeneralSettings {
    _id: string;
    setting_name: string;
    settings: IApiSettings[];
    __v: number;
}
export interface IApiSettings {
    name: string;
    value: string;
}
export interface IApiGallery {
    _id: string;
    title: string;
    fileUrl: string[];
    mimeType: string[];
    slug: string;
    __v: number;
    priority: number;
    absolutePath: string[];
    descriptions: any;
}
