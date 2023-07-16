import React, { useEffect, useRef, useState } from 'react';
import styles from './MobileNewsSection.module.scss';
import { motion, useInView } from 'framer-motion';
import { isDesktop } from 'react-device-detect';

import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';
import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import Slider from '../../../../slider/Slider';
import { Swiper as SwiperClass } from 'swiper/types';
import { IApiNews } from '../../../../../../store/api/apiTypes';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import { getDateString, getMonthString } from '../../../../../../tools/get-date-string';
import NewsModal from '../../../news/news-modal/NewsModal';

interface INewsSection {
    news: IApiNews[];
}

const MobileNewsSection: React.FC<INewsSection> = ({ news }) => {
    function vwAll(x: number) {
        const viewport =
            document.documentElement.clientWidth > 1370
                ? 1460
                : document.documentElement.clientWidth >= 1024
                ? 1200
                : document.documentElement.clientWidth >= 541
                ? 768
                : 380;

        return (x / viewport) * document.documentElement.clientWidth;
    }
    const sectionRef = useRef<HTMLElement>(null);
    const [activeNewsItem, setActiveNewsItem] = useState<IApiNews>({
        _id: '',
        title: '',
        type: '',
        createdAt: '',
        content: '',
        slug: '',
        fileUrl: '',
        mimeType: '',
        subtitle: '',
        fullUrl: '',
        galleryUrl: [],
        __v: 0,
    });
    const [isOpenModal, setIsOpenModal] = useState(false);
    const isTitleInView = useInView(sectionRef, { once: true, amount: 0.2 });
    return (
        <>
            <motion.section className={styles.wrapper} id='news_wrapper' ref={sectionRef}>
                <div className={styles.content_wrapper}>
                    <motion.div
                        className={styles.content_wrapper__news_title}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-210)}px)` }}
                    >
                        Новости
                    </motion.div>
                    <motion.div
                        className={styles.content_wrapper__stock_title}
                        style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(210)}px)` }}
                    >
                        и Акции
                    </motion.div>
                </div>
                <motion.div className={styles.slider}>
                    <Slider
                        size={'content'}
                        arrow={true}
                        isLoop={true}
                        uniqueKey={'news-section'}
                        navigationColor={'dark-grey-brick'}
                        navigationOutline={true}
                    >
                        {news
                            .slice(-5)
                            .reverse()
                            .map((item, i, row) => {
                                return (
                                    <SimpleCard
                                        theme={'outline-dark-grey'}
                                        className={styles.slider__card}
                                        key={i}
                                        onClick={() => {
                                            setActiveNewsItem(item);
                                            setIsOpenModal(true);
                                        }}
                                    >
                                        <div className={styles.slider__card_wrapper}>
                                            <div className={styles.slider__card_content}>
                                                <div className={styles.slider__card_preview}>
                                                    <img src={`${item.fullUrl}/public/news/${item.fileUrl}`} alt={item.title} />
                                                </div>
                                                <div className={styles.slider__card_dates}>
                                                    <div className={styles.slider__card_date}>{getDateString(item.createdAt)}</div>
                                                    <div className={styles.slider__card_month}>{getMonthString(item.createdAt)}</div>
                                                </div>
                                            </div>
                                            <div
                                                className={styles.slider__card_title}
                                                dangerouslySetInnerHTML={{ __html: item.title }}
                                            ></div>
                                        </div>
                                    </SimpleCard>
                                );
                            })}
                    </Slider>
                </motion.div>
                <div className={styles.content_wrapper__button}>
                    <SimpleButton
                        text='показать все'
                        type='Link'
                        link={ROUTES.news}
                        outline={true}
                        color={'dark-grey'}
                        size={'medium'}
                        children={<SvgIcons id={'arrow next dark small'} />}
                    />
                </div>
            </motion.section>
            <NewsModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} item={activeNewsItem} />
        </>
    );
};

export default MobileNewsSection;
