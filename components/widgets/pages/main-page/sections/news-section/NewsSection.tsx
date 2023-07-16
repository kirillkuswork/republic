import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './NewsSection.module.scss';
import { cubicBezier, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { IApiNews } from '../../../../../../store/api/apiTypes';
import { useAppSelector } from '../../../../../../hook';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import ROUTES from '../../../../../../constants/routes';
import SvgIcons from '../../../../../svgs/SvgIcons';
import Slider from '../../../../slider/Slider';
import SimpleCard from '../../../../cards/simple-card/SimpleCard';
import { getDateString, getMonthString } from '../../../../../../tools/get-date-string';
import NewsModal from '../../../news/news-modal/NewsModal';
import { disableBodyScroll, enableBodyScroll } from '../../../../../../tools/body-scroll-lock';
import AnimatedIconButton from '../../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import { Swiper as SwiperClass } from 'swiper/types';

interface INewsSection {
    news: IApiNews[];
}
const NewsSection: React.FC<INewsSection> = ({ news }) => {
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
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const [imgHeight, setImgHeight] = useState('10.27vw');
    const [slideWidth, setSlideWidth] = useState('39.73vw');
    const [slideHeight, setSlideHeight] = useState('26.03vw');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const titleRef = useRef<HTMLElement | null>(null);
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const sliderX = useTransform(smoothY, [0.0, 0.8], [700, 0]);
    const swiper = useRef<SwiperClass | null>(null);
    useEffect(() => {
        // if (isOpenModal) disableBodyScroll();
        // else enableBodyScroll();
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
    const handleNextSlide = () => {
        if (swiper.current) {
            swiper.current.slideNext(1000);
        }
    };

    const handlePrevSlide = () => {
        if (swiper.current) {
            swiper.current?.slidePrev(1000);
        }
    };
    return (
        <>
            <motion.section className={styles.section} ref={sectionRef}>
                <div className={styles.section__wrapper}>
                    <motion.section className={styles.section__titles} ref={titleRef}>
                        <div className={styles.section__title_block}>
                            <motion.div
                                className={styles.section__news_title}
                                style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(-520)}px)` }}
                            >
                                Новости
                            </motion.div>
                            <motion.div className={styles.section__button} style={{ opacity: isTitleInView ? '1' : '0' }}>
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
                        <motion.div
                            className={styles.section__stock_title}
                            style={{ transform: isTitleInView ? 'none' : `translateX(${vwAll(510)}px)` }}
                        >
                            и&nbsp;&nbsp;Акции
                        </motion.div>
                    </motion.section>
                    <motion.div className={styles.slider} style={{ x: sliderX }}>
                        <Slider
                            size={'content'}
                            arrow={false}
                            isLoop={true}
                            uniqueKey={'news-section'}
                            slideWidth={slideWidth}
                            minSlideHeight={slideHeight}
                            slideHeight={'auto'}
                            onSwiper={(s) => {
                                swiper.current = s;
                                if (s) s.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(0.6, 0, 0.4, 1)';
                            }}
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
                        <div className={styles.arrow}>
                            <AnimatedIconButton
                                type={'button'}
                                variant={width > widthTablet ? 'square' : 'round'}
                                outline={true}
                                color={'dark-grey-brick'}
                                direction='left'
                                onClick={handlePrevSlide}
                            >
                                <SvgIcons id={'arrow left'} />
                            </AnimatedIconButton>
                            <AnimatedIconButton
                                type={'button'}
                                variant={width > widthTablet ? 'square' : 'round'}
                                outline={true}
                                color={'dark-grey-brick'}
                                direction='right'
                                onClick={handleNextSlide}
                            >
                                <SvgIcons id={'arrow right'} />
                            </AnimatedIconButton>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
            <NewsModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} item={activeNewsItem} />
        </>
    );
};

export default NewsSection;
