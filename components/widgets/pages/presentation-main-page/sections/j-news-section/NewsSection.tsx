import React, { useEffect, useRef, useState } from 'react';
import styles from './NewsSection.module.scss';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    forMotionDiv,
    IAnimation,
    initialAsAnimateWithTransition,
    responsive,
    reverseAnimation,
    transition1200,
    transition1600,
    transition1800,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';
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
import { useAppSelector } from '../../../../../../hook';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
type IArtefactSectionAnimations = {
    [key in 'bg' | 'news' | 'stock' | 'button' | 'slider']?: IAnimation;
};
interface INewsSection {
    news: IApiNews[];
}
//Переход к странице
const fromPrevPage: IArtefactSectionAnimations = {
    bg: {
        initial: { y: 0 },
        animate: { y: -900 },
        transition: transition900,
        responsive: { y: 'vh900' },
    },
    news: {
        initial: { x: 0 },
        animate: { x: 490 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    stock: {
        initial: { x: 0 },
        animate: { x: -490 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
    button: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transition900,
    },
    slider: {
        initial: { x: 0 },
        animate: { x: -250 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
};
//К след. странице
const toNextPage: IArtefactSectionAnimations = initialAsAnimateWithTransition(fromPrevPage, transition900, {
    bg: {
        initial: { y: -900 },
        animate: { y: -900 - 900 },
    },
});

const NewsSection: React.FC<INewsSection> = ({ news }) => {
    const pageScroll = usePageScroll();
    const [animations, setAnimations] = useState<IArtefactSectionAnimations>({});
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
    const width = useAppSelector((state) => state.main.width);
    const height = useAppSelector((state) => state.main.height);
    const [imgHeight, setImgHeight] = useState('10.27vw');
    const [slideWidth, setSlideWidth] = useState('39.73vw');
    const [slideHeight, setSlideHeight] = useState('26.03vw');
    const [isOpenModal, setIsOpenModal] = useState(false);
    useEffect(() => {
        pageScroll.addStage(15, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(fromPrevPage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(toNextPage)));
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toNextPage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(fromPrevPage)));
                    return 900;
                }
            },
            onlyUpDown: true,
        });
    }, [pageScroll]);
    useEffect(() => {
        if (isOpenModal) pageScroll.blockScroll(true);
        else pageScroll.blockScroll(false);
    }, [isOpenModal]);
    React.useEffect(() => {
        if (width / height > 1.8) {
            setSlideWidth('64.44vh');
            setSlideHeight('42.22vh');
            setImgHeight('16.67vh');
        } else if (width <= 540) {
            setSlideWidth('100%');
            setSlideHeight('auto');
            setImgHeight('34.21vw');
        } else {
            setSlideWidth('39.73vw');
            setSlideHeight('26.03vw');
            setImgHeight('10.27vw');
        }
    }, [width, height]);
    React.useEffect(() => {
        if (width / height > 1.8) {
            setSlideWidth('64.44vh');
            setSlideHeight('42.22vh');
            setImgHeight('16.67vh');
        } else if (width <= 540) {
            setSlideWidth('100%');
            setSlideHeight('auto');
            setImgHeight('34.21vw');
        } else {
            setSlideWidth('39.73vw');
            setSlideHeight('26.03vw');
            setImgHeight('10.27vw');
        }
    }, []);
    return (
        <>
            <motion.div className={styles.wrapper} id='news_wrapper' {...animations.bg}>
                <div className={styles.content_wrapper}>
                    <motion.div className={styles.content_wrapper__news_title} {...animations.news}>
                        Новости
                    </motion.div>
                    <motion.div className={styles.content_wrapper__stock_title} {...animations.stock}>
                        и&nbsp;&nbsp;Акции
                    </motion.div>
                    <motion.div className={styles.content_wrapper__button} {...animations.button}>
                        <AnimatedSimpleButton
                            text='показать все'
                            theme='dark-outline'
                            link={ROUTES.news}
                            withIcon={true}
                            iconAnimation={'right'}
                            iconPosition={'right'}
                            size={'default'}
                        >
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </motion.div>
                </div>
                <motion.div className={styles.slider} {...animations.slider}>
                    <Slider
                        size={'content'}
                        arrow={true}
                        isLoop={true}
                        uniqueKey={'news-section'}
                        slideWidth={slideWidth}
                        minSlideHeight={slideHeight}
                        slideHeight={'auto'}
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
                                            <div className={styles.slider__card_dates}>
                                                <div className={styles.slider__card_date}>{getDateString(item.createdAt)}</div>
                                                <div className={styles.slider__card_month}>{getMonthString(item.createdAt)}</div>
                                            </div>
                                            <div className={styles.slider__card_content}>
                                                <div className={styles.slider__card_preview} style={{ height: imgHeight }}>
                                                    <img src={`${item.fullUrl}/public/news/${item.fileUrl}`} alt={item.title} />
                                                </div>
                                                <div
                                                    className={styles.slider__card_title}
                                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                                ></div>
                                            </div>
                                        </div>
                                    </SimpleCard>
                                );
                            })}
                    </Slider>
                </motion.div>
            </motion.div>
            <NewsModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} item={activeNewsItem} />
        </>
    );
};

export default NewsSection;
