import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCalcData, fetchCatalog, fetchInstallments, fetchQa, fetchSpecialInstallments, fetchSpecialMortgages, fetchTradeinPrograms } from '../../api/api';
import { IBank, IMortgageFilters, IStaticTerms, ITermsState } from './termsSliceTypes';
import comfort_icon_1 from '../../../public/images/terms/comfort-icon-1.svg';
import comfort_icon_2 from '../../../public/images/terms/comfort-icon-2.svg';
import comfort_icon_3 from '../../../public/images/terms/comfort-icon-3.svg';
import comfort_icon_4 from '../../../public/images/terms/comfort-icon-4.svg';
import comfort_icon_5 from '../../../public/images/terms/comfort-icon-5.svg';
import comfort_icon_6 from '../../../public/images/terms/comfort-icon-6.svg';
import { isMobileOnly } from 'react-device-detect';
import ROUTES from '../../../constants/routes';

const initialState: ITermsState = {
    navList: getStaticData().navList,
    qa: null,
    calcData: null,
    specialMortgages: null,
    installments: null,
    specialInstallments: null,
    comfort_mortgage: getStaticData().comfort_mortgage,
    special_tooltip: getStaticData().special_tooltip,
    comfort_tooltip: getStaticData().comfort_tooltip,
    catalog: null,
    filteredBanks: null,
    online_cards: getStaticData().online_cards,

    mortgageFilters: {
        cost: 1000000,
        initialPayment: 200000,
        creditAmount: 800000,
        creditTime: 20,
    },
    isFamilyMortgageFilter: false,
    numberOfRoomsFilter: 2,
    tradeInPrograms: [],
    tradein_steps: getStaticData().tradein_steps,
    tradein_advantages: getStaticData().tradein_advantages,
};

export const termsSlice = createSlice({
    name: 'termsSlice',
    initialState,
    reducers: {
        setFilteredBanks(state, action: PayloadAction<IBank[]>) {
            state.filteredBanks = action.payload;
        },
        setMortgageFilters(state, action: PayloadAction<IMortgageFilters>) {
            state.mortgageFilters = action.payload;
        },
        setIsFamilyMortgageFilter(state, action: PayloadAction<boolean>) {
            state.isFamilyMortgageFilter = action.payload;
        },
        setNumberOfRoomsFilter(state, action: PayloadAction<number>) {
            state.numberOfRoomsFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQa.fulfilled, (state, action) => {
            state.qa = action.payload;
        });
        builder.addCase(fetchQa.rejected, (state, action) => {
            console.log('Ошибка fetchQa', action.payload);
        });

        builder.addCase(fetchTradeinPrograms.fulfilled, (state, action) => {
            state.tradeInPrograms = action.payload;
        });
        builder.addCase(fetchTradeinPrograms.rejected, (state, action) => {
            console.log('Ошибка fetchTradeinPrograms', action.payload);
        });

        builder.addCase(fetchCalcData.fulfilled, (state, action) => {
            state.calcData = action.payload;
        });
        builder.addCase(fetchCalcData.rejected, (state, action) => {
            console.log('Ошибка fetchCalcData', action.payload);
        });

        builder.addCase(fetchSpecialMortgages.fulfilled, (state, action) => {
            state.specialMortgages = action.payload;
        });
        builder.addCase(fetchSpecialMortgages.rejected, (state, action) => {
            console.log('Ошибка fetchSpecialMortgages', action.payload);
        });

        builder.addCase(fetchInstallments.fulfilled, (state, action) => {
            state.installments = action.payload;
        });
        builder.addCase(fetchInstallments.rejected, (state, action) => {
            console.log('Ошибка fetchInstallments', action.payload);
        });

        builder.addCase(fetchSpecialInstallments.fulfilled, (state, action) => {
            state.specialInstallments = action.payload;
        });
        builder.addCase(fetchSpecialInstallments.rejected, (state, action) => {
            console.log('Ошибка fetchSpecialInstallments', action.payload);
        });
        builder.addCase(fetchCatalog.fulfilled, (state, action) => {
            state.catalog = action.payload;
        });
        builder.addCase(fetchCatalog.rejected, (state, action) => {
            console.log('Ошибка fetchAllFlats', action.payload);
        });
    },
});

export const { setFilteredBanks, setMortgageFilters, setIsFamilyMortgageFilter, setNumberOfRoomsFilter } = termsSlice.actions;

export default termsSlice.reducer;

export function getStaticData(): IStaticTerms {
    const data_navList = {
        name: 'purchase',
        menuItems: [
            {
                value: 'Ипотека',
                path: 'mortgage',
                fullpath: '/purchase-terms/mortgage',
                hide: false,
                id: 1,
            },
            {
                value: 'Рассрочка',
                path: 'installment',
                fullpath: '/purchase-terms/installment',
                hide: false,
                id: 2,
            },
            {
                value: '100% оплата',
                path: 'full',
                fullpath: '/purchase-terms/full',
                hide: false,
                id: 3,
            },
            {
                value: isMobileOnly ? 'Online' : 'Online оплата',
                path: 'online',
                fullpath: '/purchase-terms/online',
                hide: false,
                id: 5,
            },
            {
                value: 'Трейд-ин',
                path: 'trade-in',
                fullpath: '/purchase-terms/trade-in',
                hide: false,
                id: 6,
          },
        ],
    };
    const data_comfort_mortgage = [
        {
            id: 1,
            title: 'ЗАПОЛНИМ И ОТПРАВИМ<br/>ДОКУМЕНТЫ ЗА ВАС',
            desc: null,
            icon: comfort_icon_1,
        },
        {
            id: 2,
            title: 'ОДОБРИМ ПО двум ДОКУМЕНТАМ',
            desc: null,
            icon: comfort_icon_2,
        },
        {
            id: 3,
            title: 'НА ЭТО ВРЕМЯ БРОНИРУЕМ КВАРТИРУ',
            desc: null,
            icon: comfort_icon_3,
        },
        {
            id: 4,
            title: 'ВЕРОЯТНОСТЬ ОДОБРЕНИЯ 98%',
            desc: null,
            icon: comfort_icon_4,
        },
        {
            id: 5,
            title: 'ПОЛУЧИТЕ РЕШЕНИЕ ЗА 2 ДНЯ',
            desc: null,
            icon: comfort_icon_5,
        },
        {
            id: 6,
            title: 'СТАВКА ОТ ',
            desc: 'Самая минимальная ставка по ипотеке по стандартным программам банков, действующая на момент просмотра страницы.\n',
            icon: comfort_icon_6,
        },
    ];

    const data_special_tooltip =
        'При условии подачи заявки через компанию Forma, при подписании кредитного договора онлайн и оформлении страхования жизни через компанию Forma.';
    const data_comfort_tooltip =
        'Проект аккредитован ведущими банками, которые предлагают наиболее выгодные для вас условия кредитования. К каждому клиенту индивидуальный подход. Наш менеджер поможет вам получить одобрение по ипотеке и оформить сделку при помощи сервисов электронной регистрации и безопасных расчетов.';
    const data_online_cards = [
        {
            id: 1,
            title: 'Выберите понравившуюся квартиру',
            desc: null,
            details_desc: null,
            button: true,
            type_button: 'button',
        },
        {
            id: 2,
            title: 'Забронируйте квартиру в личном кабинете',
            desc: 'Кликните на кнопку «Купить квартиру» рядом с планировкой. Бронирование квартиры на 10 дней составит 50 000 рублей. Для бронирования потребуется только паспорт.',
            details_desc: null,
            button: false,
            type_button: null,
        },
        {
            id: 3,
            title: 'заполните анкету',
            desc: 'Укажите форму оплаты и прикрепите документы всех участников сделки (потребуются паспорт, СНИЛС и ИНН, в некоторых случаях свидетельство о браке, брачный договор или согласие супруга(-и).',
            details_desc: null,
            button: false,
            type_button: null,
        },
        {
            id: 4,
            title: 'выберите форму оплаты',
            desc: 'Картой онлайн, через аккредитив, сервис безопасных расчётов или в ипотеку.',
            details_desc: null,
            button: false,
            type_button: null,
        },
        {
            id: 5,
            title: 'подпишите договор',
            desc: 'После заполнения сформируется договор. Его необходимо подписать ЭЦП (электронной цифровой подписью).',
            details_desc: 'Если у вас нет ЭЦП, подайте документы на ее выпуск. Документы привезет наш курьер.',
            button: true,
            type_button: null,
        },
        {
            id: 6,
            title: 'откройте счет',
            desc: 'В зависимости от параметров сделки, откройте эскроу-счёт или аккредитив в банке. Подпишите кредитный договор, если сделка ипотечная.',
            details_desc:
                'Подписанные в банке документы, необходимо загрузить в личный кабинет. Подтвердите выпуск ЭЦП с помощью SMS-кода и подпишите пакет документов по сделке с помощью ЭЦП в личном кабинете.',
            button: true,
            type_button: null,
        },
        {
            id: 7,
            title: 'оплатите',
            desc: 'Оплатите договор картой онлайн, если выбрали этот тип оплаты ранее.',
            details_desc: null,
            button: false,
            type_button: null,
        },
        {
            id: 8,
            title: 'получите документы',
            desc: 'Регистрация договора в Росреестре. Занимает 2-3 недели. После регистрации документы поступят на электронную почту.',
            details_desc: null,
            button: false,
            type_button: null,
        },
    ];

    const data_tradein_steps = [
        {
            id: 1,
            title: 'ВЫБЕРИТЕ НОВУЮ КВАРТИРУ',
            btnName: 'выбрать квартиру',
            btnLink: ROUTES.list,
        },
        {
            id: 2,
            title: 'ПОЛУЧИТЕ ОЦЕНКУ ВАШЕЙ КВАРТИРЫ',
        },
        {
            id: 3,
            title: 'ЗАБРОНИРУЙТЕ КВАРТИРУ',
        },
        {
            id: 4,
            title: 'ВЫБЕРИТЕ ФОРМУ ТРЕЙД-ИН',
        },
        {
            id: 5,
            title: 'ПОДПИСЫВАЕМ ДДУ И&nbsp;ДКП',
        },
        {
            id: 6,
            title: 'ВЫ&nbsp;&mdash; ОБЛАДАТЕЛЬ НОВОЙ КВАРТИРЫ',
        },
    ];

    const data_tradein_advantages = [
      {
          id: 1,
          title: 'Выгода',
          desc: 'Фиксируем стоимость выбранной квартиры на&nbsp;время продажи недвижимости.',
          icon: comfort_icon_6,
      },
      {
          id: 2,
          title: 'ЭКОНОМИЯ ВРЕМЕНИ',
          desc: 'Берем на&nbsp;себя все заботы по&nbsp;поиску покупателей.',
          icon: comfort_icon_5,
      },
      {
          id: 3,
          title: 'НАДЕЖНОСТЬ',
          desc: 'Гарантируем юридическую чистоту сделки.',
          icon: comfort_icon_3,
      },
  ];

    return {
        navList: data_navList,
        comfort_mortgage: data_comfort_mortgage,
        special_tooltip: data_special_tooltip,
        comfort_tooltip: data_comfort_tooltip,
        online_cards: data_online_cards,
        tradein_steps: data_tradein_steps,
        tradein_advantages: data_tradein_advantages,
    };
}
