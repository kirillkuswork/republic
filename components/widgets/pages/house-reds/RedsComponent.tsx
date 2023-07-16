import React, { useState } from 'react';
import styles from './RedsComponent.module.scss';
import HousePageMain from '../house-page/main/HousePageMain';
import RedsTwins from './reds-twins/RedsTwins';
import RedsLobbyGallery from './reds-lobby-gallery/RedsLobbyGallery';
import RedsLobbyInteriors from './reds-lobby-interiors/RedsLobbyInteriors';
import RedsSalon from './reds-salon/RedsSalon';
import RedsWork from './reds-work-life/RedsWork';
import RedsFlats from './reds-flats/RedsFlats';
import HousePageParking from '../house-page/parking/HousePageParking';
import HousePageSelect from '../house-page/select/HousePageSelect';
import HousePageFlatsSlider from '../house-page/flats-slider/HousePageFlatsSlider';
import apiUrls from '../../../../constants/API';
import ROUTES from '../../../../constants/routes';
import EmptySection from '../house-page/empty/EmptySection';

export interface RedsComponent {}

const BaseTemplate: React.FC<RedsComponent> = ({}) => {
    const mainData = {
        title: 'Reds.',
        text1: 'Влюбиться',
        text2: 'сразу',
        text3: 'в двоих',
        img: '/images/houses/house-reds/reds-main.jpg',
        imgMobile: '/images/houses/house-reds/reds-main-mobile.jpg',
    };

    const parkingData = {
        title: 'Спокойная жизнь в&nbsp;REDS гарантирована в&nbsp;том числе автомобилям и&nbsp;вещам',
        imgBig: '/images/houses/house-reds/reds-parking-big.jpg',
        imgSmall: '/images/houses/house-reds/reds-parking-small.jpg',
        text: 'Двухэтажный подземный паркинг, келлеры, предназначенные для хранения сезонных вещей. На&nbsp;3-8 жилых этажах расположены просторные помещения для велосипедов и&nbsp;колясок.',
        parkingNumber: '353',
        apiUrl: apiUrls.urlSliderRedsParking,
    };

    const selectData = {
        title: 'выбрать квартиру<br />в reds',
        titleMobile: 'выбрать свою<br />квартиру',
        img: '/images/flat-select.jpg',
        imgMobile: '/images/flat-select-small.jpg',
        link: `${ROUTES.list}?house=reds`,
    };

    const flatsSliderUrl = apiUrls.urlSliderRedsFlat;
    return (
        <>
            <HousePageMain mainData={mainData} />
            <EmptySection />
            <RedsTwins />
            <RedsLobbyGallery />
            <RedsLobbyInteriors />
            {/* <EmptySection /> */}
            {/* <RedsSalon /> */}
            <RedsWork />
            <RedsFlats />
            <HousePageFlatsSlider url={flatsSliderUrl} />
            <HousePageParking parkingData={parkingData} />
            <HousePageSelect selectData={selectData} />
        </>
    );
};

export default BaseTemplate;
