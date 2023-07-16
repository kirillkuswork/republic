import { IApiCatalog, IApiTerms, IApiTermsCalcData, IApiTermsQA } from '../../api/apiTypes';

export interface ITermsNavList {
    name: string;
    menuItems: Array<{
        value: string;
        path: string;
        fullpath: string;
        hide: boolean;
        id: number;
    }>;
}
export interface IComfortMortgageIcon {
    src: string;
    width: number;
    height: number;
}

export interface ITermsComfortMortgage {
    id: number;
    title: string;
    desc: string | null;
    icon: IComfortMortgageIcon;
}

export interface ITermsOnlineCards {
    id: number;
    title: string;
    desc: string | null;
    details_desc: string | null;
    button: boolean;
    type_button: string | null;
}

export interface ITradeinSteps {
    id: number,
    title: string,
    btnName?: string,
    btnLink?: string,
}

export interface ITradeinProgram {
  item: string,
  title: string,
}

export interface ITradeinAdvantages {
    id: number,
    title: string,
    desc: string,
    icon: IComfortMortgageIcon,
}

export interface IStaticTerms {
    navList: ITermsNavList;
    special_tooltip: string;
    comfort_tooltip: string;
    comfort_mortgage: ITermsComfortMortgage[];
    online_cards: ITermsOnlineCards[];
    tradein_steps: ITradeinSteps[];
    tradein_advantages: ITradeinAdvantages[];
}

export interface IBank {
    id: IApiTermsCalcData['bank']['_id'];
    title: IApiTermsCalcData['bank']['title'];
    image: IApiTermsCalcData['bank']['imgUrl'];
    items: Omit<IApiTermsCalcData, 'bank'>[];
    filter_term: number;
    filter_amount: number;
}

export interface IMortgageFilters {
    cost: number;
    initialPayment: number;
    creditAmount: number;
    creditTime: number;
}

export interface ITermsState {
    navList: ITermsNavList;
    qa: IApiTermsQA[] | null;
    calcData: IApiTermsCalcData[] | null;
    specialMortgages: IApiTerms | null;
    installments: IApiTerms | null;
    specialInstallments: IApiTerms | null;
    comfort_mortgage: ITermsComfortMortgage[];
    special_tooltip: string;
    comfort_tooltip: string;
    catalog: IApiCatalog | null;
    filteredBanks: IBank[] | null;
    online_cards: ITermsOnlineCards[];

    mortgageFilters: IMortgageFilters;
    isFamilyMortgageFilter: boolean;
    numberOfRoomsFilter: number;
    tradeInPrograms: ITradeinProgram[] | [];
    tradein_steps: ITradeinSteps[];
    tradein_advantages: ITradeinAdvantages[];
}
