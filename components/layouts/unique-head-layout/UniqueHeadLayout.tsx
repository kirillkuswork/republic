import React, { useEffect, useState } from 'react';
import styles from './UniqueHeadLayout.module.scss';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { IApiCatalogFlat } from '../../../store/api/apiTypes';
import Head from 'next/head';
import formatLongPrice from '../../../tools/format-long-price';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { setBadgeImage } from '../../../store/slices/mainSlice';

export interface IUniqueHeadLayout {
    children: React.ReactNode;
    theme: 'light' | 'dark' | 'dark-light' | 'transparent';
    header_theme: 'light' | 'dark' | 'dark-light' | 'transparent';
    height: 'one-screen' | 'fit-content';
    pathname?: string;
    flat?: IApiCatalogFlat;
}

const UniqueHeadLayout: React.FC<IUniqueHeadLayout> = ({ children, theme, height, header_theme, flat }) => {
	const dispatch = useAppDispatch();
	const flatImage = flat ? `/plans/${flat.bulk_id}/flats/furnished-plan/${flat.number}.png` : '/badge.jpg';
    const [title, setTitle] = useState('');
    const [description] = useState(
        'Жилой квартал бизнес-класса. улица Пресненский Вал, 27с2, Москва, ЦАО, Пресненский район, метро Белорусская.',
    );

    useEffect(() => {
        if (flat) {
            flat.rooms === 'studio'
                ? setTitle(
                      `Квартира-студия в ЖК Republic (Репаблик) за ${formatLongPrice(flat.currentPrice)} руб., ${flat.area} м.кв., этаж ${
                          flat.floor
                      }/${flat.section.floorsCount}`,
                  )
                : setTitle(
                      `${flat.rooms}-комнатная квартира в ЖК Republic (Репаблик) за ${formatLongPrice(flat.currentPrice)} руб., ${
                          flat.area
                      } м.кв., этаж ${flat.floor}/${flat.section.floorsCount}`,
                  );
        }
    }, [flat, title, setTitle]);

    // useEffect(() => {
    // 	if (flat) {
    // 		if (flat.layout.flat_plan_png) {
    // 			dispatch(setBadgeImage(flat.layout.flat_plan_png))
    // 		} else dispatch(setBadgeImage('/badge.jpg'))
    // 	}
    // }, [])

    return (
        <>
            <Head>
                <title>{title}</title>
				<meta charSet='utf-8' />
				<link rel='icon' href='%PUBLIC_URL%/favicon.ico' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name='description' content={description} />
                <meta property='og:type' content='website' />
                <meta property='og:title' content={title} />
				<meta property='og:site_name' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:image:width' content='1200' />
                <meta property='og:image:height' content='628' />
                <meta name='twitter:title' content={title} />
                <meta name='twitter:description' content={description} />
				<meta name='twitter:card' content='summary_large_image' />
                <meta name='vk:title' content={title} />
                <meta name='vk:description' content={description} />
                <meta property='og:image' content={flatImage} />

				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#000000' />
				<meta name='msapplication-TileColor' content='#000000' />
				<meta name='theme-color' content='#ffffff' />
            </Head>
            <Header theme={header_theme} />
            <main className={styles.container + ` ${styles[theme]}` + ` ${styles[height]}`}>{children}</main>
            <Footer flat={flat} />
        </>
    );
};

export default UniqueHeadLayout;
