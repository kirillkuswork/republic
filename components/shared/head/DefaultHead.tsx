import Head from 'next/head';
import React from 'react';

const DefaultHead = () => {
    return (
        <Head>
            <meta charSet='utf-8' />
            <link rel='icon' href='%PUBLIC_URL%/favicon.ico' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta
                name='description'
                content='Republic — жилой квартал премиум-класса на Пресне от Forma. Новый центр притяжения Москвы с архитектурой от 6 зарубежных и российских бюро. Гастро-центр, термы и арт-бульвар на территории.'
            />
            <meta property='og:title' content='Republic — новый городской квартал от застройщика Forma' />
            <meta property='og:site_name' content='Republic' />
            <meta
                property='og:description'
                content='Republic — жилой квартал премиум-класса на Пресне от Forma. Новый центр притяжения Москвы с архитектурой от 6 зарубежных и российских бюро. Гастро-центр, термы и арт-бульвар на территории.'
            />
            <meta name='twitter:title' content='Republic — новый городской квартал от застройщика Forma' />
            <meta
                name='twitter:description'
                content='Republic — жилой квартал премиум-класса на Пресне от Forma. Новый центр притяжения Москвы с архитектурой от 6 зарубежных и российских бюро. Гастро-центр, термы и арт-бульвар на территории.'
            />
            <meta name='twitter:card' content='summary_large_image' />
            <meta property='og:image' content='/badge.jpg' />
            <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
            <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
            <link rel='manifest' href='/site.webmanifest' />
            <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#000000' />
            <meta name='msapplication-TileColor' content='#000000' />
            <meta name='theme-color' content='#ffffff' />
            <title>Republic — новый городской квартал от застройщика Forma</title>
        </Head>
    );
};

export default DefaultHead;
