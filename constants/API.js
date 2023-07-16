const BLOCK_ID = 427; //REPUBLIC

export const blockId = `blockId=${BLOCK_ID}`;

const constants = {
    urlCatalog: `https://manager.forma.ru/api/v2/flat?${blockId}`,
    urlFlat: `https://manager.forma.ru/api/v2/flat/`,
    urlFlatCheck: 'https://manager.forma.ru/api/v2/flat/check?ids=',
    //Страница "Условия покупки"
    urlNavList: '/api/menu/purchase',
    urlQa: '/api/qa',
    urlSpecialMortgages: '/api/special_program/mortgage',
    urlCalcData: '/api/mortgages',
    urlInstallments: '/api/special_program/installment',
    urlSpecialInstallments: '/api/special_program/installment-main',
    urlTradeinProgram: '/api/special_program/trade-in',

    //Новости
    urlNews: '/api/news',

    //Ход строительства
    urlProgress: '/api/progress',

    //Слайдеры
    urlSliderRedsFirst: '/api/slider/redsFirst',
    urlSliderRedsLobby: '/api/slider/redsSecond',
    urlSliderRedsSalon: '/api/slider/redsThird',
    urlSliderRedsFlat: '/api/slider/redsFourth',
    urlSliderRedsParking: '/api/slider/redsParking',
    urlSliderRedsViews: '/api/slider/redsViews',
    urlSliderPlatinumLobbyDay: '/api/slider/platinumLobbyDay',
    urlSliderPlatinumLobbyNight: '/api/slider/platinumLobbyNight',
    urlSliderPlatinumLobbySliderDay: '/api/slider/platinumLobbySliderDay',
    urlSliderPlatinumLobbySliderNight: '/api/slider/platinumLobbySliderNight',
    urlSliderPlatinumGameZone: '/api/slider/platinumGameZone',
    urlSliderPlatinumParking: '/api/slider/platinumParking',
    urlSliderPlatinumFlat: '/api/slider/platinumFlats',
    urlSliderContacts: '/api/slider/contacts',
    urlSliderStreets: '/api/slider/streets',
    urlSliderSpices: '/api/slider/lifestyleSpices',
    urlSliderChildhood: '/api/slider/lifestyleChildhood',
    urlSliderRestaurant: '/api/slider/lifestyleRestaurant',
    urlSliderSpa: '/api/slider/lifestyleSpa',
    urlSliderWalk: '/api/slider/lifestyleWalk',
    urlSliderSociety: '/api/slider/lifestyleSociety',
    urlFlatReds: '/api/slider/apartmentReds',

    urlFlatPlatinum: '/api/slider/apartmentPlatinum',
    urlFlatPlatinum2: '/api/slider/apartmentPlatinum2',
    urlFlatPlatinum3: '/api/slider/apartmentPlatinum3',
    urlFlatPlatinum4: '/api/slider/apartmentPlatinum4',

    //Документы
    urlDocuments: '/api/documents',

    //Галерея
    urlGallery: '/api/gallery',

    //Футер меню
    urlFooterPrimary: '/api/menu/primary',
    urlFooterSecondary: '/api/menu/secondary',

    //Общее
    urlGeneralSettings: '/api/general_settings',
};

export default constants;
