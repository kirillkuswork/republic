import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from './NewsComponent.module.scss';
import apiUrls from '../../../../constants/API';
import Slider from '../../slider/Slider';
import SimpleCard from '../../cards/simple-card/SimpleCard';
import NewsModal from './news-modal/NewsModal';
import { IApiNews } from '../../../../store/api/apiTypes';
import { getDateString, getMonthString } from '../../../../tools/get-date-string';
import { IAnimation, transition1200, transition1800 } from '../../../shared/page-scroll/animation_helpers';
import SvgIcons from '../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../hook';

type IArtefactSectionAnimations = {
    [key in 'bg' | 'news' | 'stock' | 'newsMobile' | 'slider']?: IAnimation;
};

export interface NewsComponent {}

//Переход к странице
const animations: IArtefactSectionAnimations = {
    news: {
        initial: { x: -500 },
        animate: { x: 0 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    stock: {
        initial: { x: 500 },
        animate: { x: 0 },
        transition: transition1200,
        responsive: { x: 'vw1460' },
    },
    slider: {
        initial: { x: 250 },
        animate: { x: 0 },
        transition: transition1800,
        responsive: { x: 'vw1460' },
    },
    newsMobile: {
        initial: { y: 250 },
        animate: { y: 0 },
        transition: transition1800,
        // responsive: { x: 'vw1460' },
    },
};

const BaseTemplate: React.FC<NewsComponent> = ({}) => {
    const [news, setNews] = useState<IApiNews[]>([]);
    const [paginatedNews, setPaginatedNews] = useState<IApiNews[]>([]);
    const [isShowMore, setIsShowMore] = useState(false);
    const step = 6;
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

    const showMore = () => {
        let index = paginatedNews.length + step;
        const newPaginatedNews = news.slice(0, index);
        setPaginatedNews(newPaginatedNews);
        console.log(newPaginatedNews.length, news.length);
        if (newPaginatedNews.length === news.length) {
            setIsShowMore(false);
        }
        // else {
        //   setIsShowMore(true)
        // }
    };

    React.useEffect(() => {
        axios.get(apiUrls.urlNews).then((resp) => {
            const newsData = resp.data.sort((a: IApiNews, b: IApiNews) => {
                if (new Date(a.createdAt) < new Date(b.createdAt)) {
                    return 1;
                }
                if (new Date(a.createdAt) > new Date(b.createdAt)) {
                    return -1;
                }
                return 0;
            });
            // console.log(newsData);
            setNews(newsData);
            setPaginatedNews(newsData.slice(0, step));
            if (newsData.length > step) {
                setIsShowMore(true);
            }
        });
    }, []);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const width = useAppSelector((state) => state.main.width);
    const height = useAppSelector((state) => state.main.height);
    // for slider sizes - different sizes for extra wide screens
    const [slideWidth, setSlideWidth] = useState('39.73vw');
    const [slideHeight, setSlideHeight] = useState('26.03vw');
    const [imgHeight, setImgHeight] = useState('10.27vw');

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
            <section className={styles.container}>
                <div className={styles.title}>
                    <motion.div className={styles.titleLeft} {...animations.news}>
                        Новости
                    </motion.div>
                    <motion.div className={styles.titleRight} {...animations.stock}>
                        и&nbsp;&nbsp;Акции
                    </motion.div>
                </div>
                {news.length > 0 && (
                    <>
                        <motion.div className={styles.slider} {...animations.slider}>
                            <Slider
                                slideWidth={slideWidth}
                                minSlideHeight={slideHeight}
                                slideHeight={'auto'}
                                size={'content'}
                                arrow={true}
                                isLoop={false}
                                uniqueKey={'news-section'}
                                navigationColor='dark-grey-brick'
                            >
                                {news.map((item, i) => {
                                    return (
                                        <SimpleCard
                                            theme={'outline-dark-grey'}
                                            className={styles.card}
                                            key={i}
                                            onClick={() => {
                                                setActiveNewsItem(item);
                                                setIsOpenModal(true);
                                            }}
                                        >
                                            {/* <div className={styles.cardWrapper}> */}
                                            <div className={styles.cardDates}>
                                                <div className={styles.cardDate}>{getDateString(item.createdAt)}</div>
                                                <div className={styles.cardMonth}>{getMonthString(item.createdAt)}</div>
                                            </div>
                                            <div className={styles.cardContent}>
                                                <div className={styles.cardPreview} style={{ height: imgHeight }}>
                                                    <img src={`${item.fullUrl}/public/news/${item.fileUrl}`} alt={item.title} />
                                                </div>
                                                <div className={styles.cardTitle} dangerouslySetInnerHTML={{ __html: item.title }}></div>
                                            </div>
                                            <div className={item.type === 'Акция' ? styles.cardPromo : styles.disabled}>% акция</div>
                                            {/* </div> */}
                                        </SimpleCard>
                                    );
                                })}
                            </Slider>
                        </motion.div>

                        <motion.div className={styles.newsMobile} {...animations.newsMobile}>
                            <>
                                {paginatedNews.map((item, i) => {
                                    return (
                                        <SimpleCard
                                            theme={'outline-dark-grey'}
                                            className={styles.card}
                                            key={i}
                                            onClick={() => {
                                                setActiveNewsItem(item);
                                                setIsOpenModal(true);
                                            }}
                                        >
                                            {/* <div className={styles.cardWrapper}> */}
                                            <div className={styles.cardDown}>
                                                <div className={styles.cardPreview} style={{ height: imgHeight }}>
                                                    <img src={`${item.fullUrl}/public/news/${item.fileUrl}`} alt={item.title} />
                                                </div>
                                                <div className={styles.cardContent}>
                                                    <div className={styles.cardDates}>
                                                        <div className={styles.cardDate}>{getDateString(item.createdAt)}</div>
                                                        <div className={styles.cardMonth}>{getMonthString(item.createdAt)}</div>
                                                    </div>
                                                    <div className={item.type === 'Акция' ? styles.cardPromo : styles.disabled}>
                                                        % акция
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.cardTitle} dangerouslySetInnerHTML={{ __html: item.title }}></div>
                                            {/* </div> */}
                                        </SimpleCard>
                                    );
                                })}
                                <button onClick={() => showMore()} className={isShowMore ? styles.showMore : styles.disabled}>
                                    <div>Показать еще</div>
                                    <SvgIcons id='arrow down dark in a circle' />
                                </button>
                            </>
                        </motion.div>
                    </>
                )}
            </section>
            <NewsModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} item={activeNewsItem} />
        </>
    );
};

export default BaseTemplate;
