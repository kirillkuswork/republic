import { createSlice } from '@reduxjs/toolkit';
import ROUTES from '../../constants/routes';

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState: {
        width: 0,
        height: 0,
        isTopPosition: true,
        scrollPosition: 0,
        breakpoint: {
            tablet: 1023,
            mobile: 541,
        },
        deadlines: {
            commissioning: {
                text: 'Выдача ключей',
                date: '14 марта 2023',
            },
        },
        contacts: {
            coordinates: [55.77453083129319, 37.57068425662907],
            address: {
                text: 'Москва, ул. Пресненский вал, 27с2',
            },
            //Телефон с главной страницы
            phone: {
                text: '+7 495 104 86 91',
                link: '+74951048691',
            },
            email: {
                text: 'sales@forma.ru',
                link: 'mailto:sales@forma.ru',
            },
            time: {
                text: 'с 9:00 до 21:00 eжедневно',
            },
        },
        isLoadingWebsite: false,
        sections: [
            { name: 'reds', architect: 'Steve Brown', img: 'houses-reds.jpg' },
            { name: 'platinum', architect: 'Ian Simpson & Rachel Haugh', img: 'houses-platinum.jpg' },
            { name: 'purple', architect: 'Юрий Григорян', img: 'houses-purple.png' },
            { name: 'whites', architect: 'Aidan Potter', img: 'houses-whites.png' },
            { name: 'brown', architect: 'Max Dudler', img: 'houses-brown.png' },
            { name: 'green', architect: 'Рубен Аракелян', img: 'houses-green.png' },
            { name: 'silver', architect: 'Max Dudler', img: 'houses-silver.png' },
            { name: 'gold', architect: 'Рубен Аракелян', img: 'houses-gold.png' },
        ],
        routes: [
            {
                title: 'меню',
                pathname: ROUTES.root,
            },
            {
                title: 'квартиры',
                pathname: ROUTES.list,
            },
            {
                title: 'квартиры',
                pathname: ROUTES.visual.root,
            },
            {
                title: 'дома',
                pathname: ROUTES.houses,
            },
            {
                title: 'reds',
                pathname: `${ROUTES.house}/reds`,
            },
            {
                title: 'о проекте',
                pathname: ROUTES.about,
            },
            {
                title: 'лайфстайл',
                pathname: ROUTES.lifestyle,
            },
            {
                title: 'расположение',
                pathname: ROUTES.location,
            },
            {
                title: 'история',
                pathname: ROUTES.history,
            },
            {
                title: 'галерея',
                pathname: ROUTES.gallery,
            },
            {
                title: 'ход строительства',
                pathname: ROUTES.progress,
            },
            {
                title: 'новости',
                pathname: ROUTES.news,
            },
            {
                title: 'контакты',
                pathname: ROUTES.contacts,
            },
            {
                title: 'документы',
                pathname: ROUTES.documents,
            },
            {
                title: 'условия покупки',
                pathname: ROUTES.purchaseTerms.root,
            },
        ],
        currentPath: '',
		isANewUser: false,
		badgeImage: '/badge.jpg',
    },
    reducers: {
        changeIsLoadingWebsite(state, action) {
            state.isLoadingWebsite = action.payload;
        },
        changeCurrentPath(state, action) {
            state.currentPath = action.payload;
        },
        setWidth(state, action) {
            state.width = action.payload;
        },
        setHeight(state, action) {
            state.height = action.payload;
        },
        setIsTopPosition(state, action) {
            state.isTopPosition = action.payload;
        },
        setScrollPosition(state, action) {
            state.scrollPosition = action.payload;
        },
		handleNewUser: (state, action) => {
			state.isANewUser = action.payload;
		},
		setBadgeImage(state, action) {
			state.badgeImage = action.payload;
		},
    },
});

export default mainSlice.reducer;
export const { changeCurrentPath, setWidth, setHeight, setIsTopPosition, setScrollPosition, handleNewUser, setBadgeImage } = mainSlice.actions;
