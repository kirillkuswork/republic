import React, { useState } from 'react';
import styles from './PlatinumComponent.module.scss';
import HousePageMain from '../house-page/main/HousePageMain';
import EmptySection from '../house-page/empty/EmptySection';
import HousePageParking from '../house-page/parking/HousePageParking';
import HousePageSelect from '../house-page/select/HousePageSelect';
import HousePageFlatsSlider from '../house-page/flats-slider/HousePageFlatsSlider';
import apiUrls from '../../../../constants/API';
import ROUTES from '../../../../constants/routes';
import PlatinumTower from './platinum-tower/PlatinumTower';
import PlatinumRoad from './platinum-road/PlatinumRoad';
import PlatinumLobbyInteriors from './platinum-lobby-interiors/PlatinumLobbyInteriors';
import PlatinumFlats from './platinum-flats/PlatinumFlats';

export interface PlatinumComponent {}

const BaseTemplate: React.FC<PlatinumComponent> = ({}) => {
    const mainData = {
        title: 'Platinum.',
        text1: 'Повернуться',
        text2: 'лицом',
        text3: 'к солнцу',
        img: '/images/houses/house-platinum/platinum-main.jpg',
        imgMobile: '/images/houses/house-platinum/platinum-main.jpg',
    };
    const parkingData = {
        title: 'В&nbsp;PLATINUM спокойствие гарантировано не&nbsp;только&nbsp;людям, но&nbsp;и&nbsp;их автомобилям',
        imgBig: '/images/houses/house-reds/reds-parking-big.jpg',
        imgSmall: '/images/houses/house-platinum/platinum-parking-small.jpg',
        text: 'Двухэтажный подземный паркинг разместит ваши автомобили, а&nbsp;на&nbsp;первом этаже лобби найдется место для остального транспорта, здесь расположены просторные помещения для велосипедов и&nbsp;колясок.',
        parkingNumber: '353',
        apiUrl: apiUrls.urlSliderPlatinumParking,
    };

    const selectData = {
        title: 'выбрать квартиру<br />в platinum',
        titleMobile: 'выбрать квартиру<br />в platinum',
        img: '/images/houses/house-platinum/platinum-flat-select.jpg',
        imgMobile: '/images/houses/house-platinum/platinum-flat-select.jpg',
        link: `${ROUTES.list}?house=platinum`,
    };

    const flatsSliderUrl = apiUrls.urlSliderPlatinumFlat;

    return (
        <>
            <HousePageMain mainData={mainData} />
            <EmptySection />
            <PlatinumTower />
            <PlatinumRoad />
            <PlatinumLobbyInteriors />
            <PlatinumFlats />
            <HousePageFlatsSlider url={flatsSliderUrl} />
            <HousePageParking parkingData={parkingData} />
            <HousePageSelect selectData={selectData} />
        </>
    );
};

export default BaseTemplate;
