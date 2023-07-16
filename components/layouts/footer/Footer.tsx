import React, { useEffect, useState } from 'react';
import styles from './Footer.module.scss';
import FooterNav from './footer-nav/FooterNav';
import SvgIcons from '../../svgs/SvgIcons';
import FormaLogo from '../../svgs/FormaLogo/FormaLogo';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../hook';
import axios from 'axios';
import API from '../../../constants/API';
import { AnimationProps, motion } from 'framer-motion';
import { openModal } from '../../../store/slices/callOrder/callOrderSlice';
import AnimatedIconButton from '../../features/buttons/animated-icon-button/AnimatedIconButton';
import { IApiCatalogFlat } from '../../../store/api/apiTypes';
import AnimatedSimpleButton from '../../features/buttons/animated-simple-button/AnimatedSimpleButton';

const currentYear = new Date().getFullYear();

export interface IFooter {
    className?: string;
    animation?: {
        initial: AnimationProps['initial'];
        animate: AnimationProps['animate'];
        transition: AnimationProps['transition'];
    };
    flat?: IApiCatalogFlat;
    onAllDataLoaded?: () => void;
    customScrollToTopFunc?: () => void;
}

export interface ILink {
    value: string;
    path: string;
    highlight: boolean;
    hide: boolean;
    id: number;
}

const Footer: React.FC<IFooter> = ({ className, animation, onAllDataLoaded, customScrollToTopFunc, flat }) => {
    const dispatch = useAppDispatch();

    const [primaryMenu, setPrimaryMenu] = useState(null);
    const [secondaryMenu, setSecondaryMenu] = useState(null);

    const [primaryLoaded, setPrimaryLoaded] = useState(false);
    const [secondaryLoaded, setSecondaryLoaded] = useState(false);

    useEffect(() => {
        axios
            .get(API.urlFooterPrimary)
            .then((resp) => {
                if (resp.data) {
                    setPrimaryMenu(resp.data.menuItems);
                }
            })
            .finally(() => setPrimaryLoaded(true));
        axios
            .get(API.urlFooterSecondary)
            .then((resp) => {
                if (resp.data) {
                    setSecondaryMenu(resp.data.menuItems);
                }
            })
            .finally(() => setSecondaryLoaded(true));
        //Если апи так и висят
        setTimeout(() => {
            setPrimaryLoaded(true);
            setSecondaryLoaded(true);
        }, 10000);
    }, []);

    useEffect(() => {
        if (primaryLoaded && secondaryLoaded && onAllDataLoaded) onAllDataLoaded();
    }, [primaryLoaded, secondaryLoaded]);

    const scrollToTop = () => {
        if (customScrollToTopFunc) customScrollToTopFunc();
        else
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
    };

    const handleBtnClick = () => {
        dispatch(openModal('footerForm'));
    };

    const router = useRouter();

    const { email, phone, time, address } = useAppSelector((state) => state.main.contacts);

    const Footer = (props: React.ComponentProps<'footer'>) => {
        if (!animation) return <footer {...props}></footer>;
        else return <motion.footer {...(props as React.ComponentType<React.PropsWithChildren<{}>>)} {...animation}></motion.footer>;
    };

    return (
        <Footer className={styles.footer + ` ${className ?? ''}`}>
            <section className={styles.footerBreadcrumbs}>
                <Breadcrumbs key={router.asPath} flat={flat} />
            </section>

            <section className={styles.footerMain}>
                <AnimatedIconButton
                    type={'button'}
                    variant='round'
                    outline={true}
                    color={'brick'}
                    direction='up'
                    onClick={scrollToTop}
                    className={styles.scrollTopButton}
                >
                    <SvgIcons id={'arrow up'} />
                </AnimatedIconButton>

                <div className={styles.footerMainTop}>
                    <div className={styles.Info}>
                        <a className={styles.InfoTel} href={`tel:${phone.link}`}>
                            {phone.text}
                        </a>
                        <p className={styles.InfoAddress}>
                            Дизайн пространство
                            <br />
                            {address.text}
                        </p>
                        <p className={styles.InfoTime}>{time.text}</p>
                    </div>

                    <nav className={`${styles.Nav} + ${styles.footerMainRight}`}>
                        <ul>
                            <li>{primaryMenu && <FooterNav links={primaryMenu} />}</li>
                        </ul>
                        <ul>
                            <li>{secondaryMenu && <FooterNav links={secondaryMenu} />}</li>
                        </ul>
                    </nav>
                </div>

                <div className={styles.footerMainBottom}>
                    <div className={styles.AdditionalInfo}>
                        <AnimatedSimpleButton
                            text='Оставить заявку'
                            theme='light-outline'
                            onClick={handleBtnClick}
                            width='fit-content'
                            size='mini'
                        />
                        {/* <SimpleButton
                            text='Оставить заявку'
                            type='button'
                            size='mini'
                            color='light'
                            width='fit-content'
                            outline
                            func={handleBtnClick}
                        /> */}
                        <div className={styles.contacts}>
                            <AnimatedIconButton
                                type={'link'}
                                href='https://vk.com/republic.forma'
                                variant='round'
                                outline={true}
                                color={'white-brick'}
                                direction='up'
                            >
                                <SvgIcons id={'vk logo'} />
                            </AnimatedIconButton>
                            <AnimatedIconButton
                                type={'link'}
                                href='https://t.me/republic_forma'
                                variant='round'
                                outline={true}
                                color={'white-brick'}
                                direction='up'
                                className={styles.tg}
                            >
                                <SvgIcons id={'tg logo'} />
                            </AnimatedIconButton>
                        </div>
                    </div>
                    <div className={`${styles.forma} ${styles.footerMainRight}`}>
						<a className={styles.formaMail} href={`${email.link}`}>
                            {email.text}
                        </a>
                        <a href='https://forma.ru' target='_blank' rel='noreferrer' className={styles.formaLogo}>
                            <FormaLogo />
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles.footerLogo}>
                {/* <SvgIcons id={'logo'} theme={'brick'} width={'100%'} /> */}
				<svg width="100%" viewBox="0 0 1420 328" fill="#AD7C53" xmlns="http://www.w3.org/2000/svg">
					<path d="M124.423 100.502C124.365 86.3599 118.877 72.8173 109.16 62.8383C99.4437 52.8594 86.2899 47.2568 72.5778 47.257H41.3693V153.715H72.1675C78.9546 153.737 85.679 152.376 91.955 149.711C98.2311 147.046 103.935 143.129 108.74 138.185C113.546 133.241 117.357 127.368 119.956 120.901C122.555 114.435 123.891 107.503 123.887 100.502H124.423ZM113.6 185.838L160.933 323.509H115.02L70.5581 195.928H41.464V323.509H0V4.55644H72.2623C93.2329 4.42796 113.625 11.6437 130.102 25.0231C146.58 38.4026 158.167 57.1535 162.968 78.2084C167.769 99.2632 165.5 121.375 156.532 140.927C147.564 160.479 132.428 176.313 113.6 185.838Z" />
					<path d="M348.689 4.58897H191.952V323.476H348.689V280.841H233.416V195.928H338.433V153.715H233.416V47.257H348.689V4.58897Z" />
					<path d="M499.619 100.502C499.552 86.3795 494.075 72.8565 484.38 62.8822C474.686 52.9078 461.561 47.2912 447.868 47.257H416.533V153.715H447.331C454.117 153.733 460.84 152.369 467.114 149.702C473.388 147.036 479.091 143.119 483.895 138.176C488.699 133.233 492.511 127.361 495.112 120.896C497.712 114.432 499.051 107.501 499.051 100.502H499.619ZM447.868 195.928H416.533V323.509H375.195V4.55648H447.458C459.637 4.52869 471.702 6.97534 482.964 11.7567C494.226 16.538 504.465 23.5604 513.096 32.423C521.727 41.2856 528.581 51.8147 533.266 63.4093C537.952 75.0038 540.378 87.4367 540.405 99.9981C540.431 112.559 538.059 125.003 533.424 136.619C528.788 148.235 521.979 158.795 513.386 167.697C504.793 176.599 494.585 183.668 483.343 188.501C472.101 193.333 460.047 195.835 447.868 195.863" />
					<path d="M733.382 242.892C733.382 265.464 724.689 287.111 709.214 303.072C693.739 319.033 672.75 328 650.865 328C628.98 328 607.991 319.033 592.516 303.072C577.041 287.111 568.347 265.464 568.347 242.892C568.347 163.284 568.757 84.0991 568.757 4.49129H609.779V242.892C610.077 253.974 614.554 264.5 622.259 272.23C629.964 279.96 640.289 284.285 651.038 284.285C661.787 284.285 672.112 279.96 679.818 272.23C687.523 264.5 692 253.974 692.297 242.892V4.49129H733.761C733.761 99.9491 733.351 55.5236 733.351 242.892" />
					<path d="M834.329 174.382H803.12V280.841H833.918C840.801 281.042 847.653 279.821 854.072 277.251C860.49 274.68 866.345 270.811 871.292 265.871C876.239 260.931 880.178 255.021 882.877 248.487C885.576 241.954 886.98 234.93 887.008 227.828C887.035 220.727 885.685 213.691 883.036 207.136C880.388 200.581 876.495 194.638 871.586 189.658C866.677 184.678 860.852 180.761 854.454 178.137C848.055 175.514 841.213 174.237 834.329 174.382ZM834.329 47.257H803.12V132.17H833.918C844.899 132.17 855.431 127.678 863.204 119.679C870.978 111.68 875.357 100.827 875.382 89.5018C875.416 83.9359 874.378 78.4186 872.328 73.2697C870.278 68.1208 867.258 63.4428 863.442 59.5071C859.626 55.5713 855.09 52.4562 850.098 50.3421C845.106 48.2281 839.757 47.1573 834.36 47.1919L834.329 47.257ZM834.36 323.443H761.782V4.49129H834.045C844.896 4.4399 855.65 6.59561 865.693 10.835C875.735 15.0745 884.869 21.3145 892.571 29.1981C900.274 37.0816 906.393 46.4542 910.58 56.7794C914.767 67.1046 916.939 78.1798 916.973 89.3717C916.979 101.044 914.625 112.59 910.061 123.271C905.497 133.952 898.823 143.534 890.466 151.405C905.962 163.505 917.383 180.32 923.115 199.475C928.846 218.631 928.601 239.159 922.411 258.162C916.222 277.166 904.402 293.684 888.62 305.386C872.838 317.087 853.892 323.381 834.455 323.378" />
					<path d="M953.609 323.476V4.58897H995.073V280.808H1061.78V323.476H953.609Z" />
					<path d="M1337.48 327.902C1326.65 327.967 1315.91 325.817 1305.88 321.577C1295.86 317.337 1286.74 311.091 1279.07 303.199C1271.4 295.307 1265.32 285.926 1261.18 275.598C1257.04 265.269 1254.93 254.198 1254.96 243.022V85.1081C1254.96 62.5361 1263.66 40.8884 1279.13 24.9276C1294.61 8.9667 1315.6 0 1337.48 0C1359.37 0 1380.36 8.9667 1395.83 24.9276C1411.31 40.8884 1420 62.5361 1420 85.1081H1378.98C1378.98 73.766 1374.61 62.8884 1366.83 54.8683C1359.06 46.8482 1348.51 42.3425 1337.51 42.3425C1326.52 42.3425 1315.97 46.8482 1308.19 54.8683C1300.42 62.8884 1296.05 73.766 1296.05 85.1081V243.022C1295.9 248.709 1296.85 254.37 1298.86 259.671C1300.86 264.971 1303.88 269.803 1307.72 273.882C1311.57 277.96 1316.17 281.202 1321.25 283.415C1326.33 285.629 1331.79 286.769 1337.31 286.769C1342.82 286.769 1348.28 285.629 1353.37 283.415C1358.45 281.202 1363.05 277.96 1366.89 273.882C1370.74 269.803 1373.76 264.971 1375.76 259.671C1377.77 254.37 1378.72 248.709 1378.57 243.022H1420C1420.03 254.198 1417.92 265.269 1413.78 275.598C1409.64 285.926 1403.56 295.307 1395.89 303.199C1388.22 311.091 1379.11 317.337 1369.08 321.577C1359.06 325.817 1348.32 327.967 1337.48 327.902Z" />
					<path d="M1090.62 323.509V280.841H1098.32C1109.31 280.849 1119.84 276.36 1127.62 268.359C1135.39 260.358 1139.77 249.5 1139.79 238.173V57.7042C1139.78 54.9305 1138.7 52.2732 1136.8 50.3149C1134.89 48.3566 1132.31 47.2569 1129.63 47.257H1090.21V4.6215H1230.38V47.257H1191.38C1188.69 47.257 1186.12 48.3577 1184.22 50.3169C1182.32 52.2762 1181.25 54.9334 1181.25 57.7042V238.173C1181.25 243.783 1182.33 249.337 1184.42 254.519C1186.5 259.7 1189.56 264.406 1193.41 268.368C1197.26 272.331 1201.83 275.472 1206.86 277.612C1211.89 279.752 1217.27 280.849 1222.71 280.841H1230.38V323.509H1090.62Z" />
				</svg>
            </section>

            <section className={styles.footerBottom}>
                <p>
                    © {currentYear} ООО «ФОРМА». Не является публичной офертой. Визуализации и планировки объекта являются ориентировочными.
                    Проектная декларация на сайте{' '}
                    <a
                        className={styles.footerBottomLink}
                        href='https://наш.дом.рф/сервисы/каталог-новостроек/объект/46687'
                        target='_blank'
                        rel='noreferrer'
                    >
                        дом.рф
                    </a>
                </p>
                <div className={styles.footerBottomRight}>
                    <a href='https://forma.ru' className={styles.footerBottomForma}>
                        <FormaLogo width={'80'} opacity={0.4} />
                    </a>
                    <p className={styles.footerBottomDesign}>
                        <span>Дизайн сайта от Vide Infra</span> <SvgIcons id={'vi logo'} />
                    </p>
                </div>
            </section>
        </Footer>
    );
};

export default Footer;
