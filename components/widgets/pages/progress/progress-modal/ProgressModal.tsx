import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import styles from './ProgressModal.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { getMonth } from '../../../../../tools/get-string-month';
import { useAppSelector } from '../../../../../hook';
import { disableBodyScroll, enableBodyScroll } from '../../../../../tools/body-scroll-lock';
import { whiteBoxParts, whiteBoxPartsDetails } from '../../../../../constants/whiteBox';
import IconButton from '../../../../features/buttons/icon-button/IconButton';
import whiteBoxImg from '../../../../../public/images/houses/house-reds/reds-whitebox.jpg';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import { IApiProgress } from '../../../../../store/api/apiTypes';
import Slider from '../../../slider/Slider';
import VideoContainer from '../../../video-container/VideoContainer';

export interface ProgressModal {
    isOpen: boolean;
    setIsOpen: any;
    item: IApiProgress;
    files: { file: string; type: string }[];
    poster?: string;
}

const ProgressModal: React.FC<ProgressModal> = ({ isOpen, setIsOpen, item, files, poster }) => {
    useEffect(() => {
        if (isOpen) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    }, [isOpen]);

    const video = files.find((item) => item.type.split('/')[0] === 'video') || { file: '', type: '' };
    const images = files.filter((item) => item.type.split('/')[0] === 'image');

    const [activeMediaType, setActiveMediaType] = useState('images');

    const width = useAppSelector((state) => state.main.width);
    const height = useAppSelector((state) => state.main.height);

    // for slider sizes - different sizes for extra wide screens
    const [slideWidth, setSlideWidth] = useState('72.6vw');
    const [slideHeight, setSlideHeight] = useState('45.2vw');
    useEffect(() => {
        if (width / height > 1.8) {
            setSlideWidth('64.44vh');
            setSlideHeight('44.44vh');
            // } else if (width <= 540) {
            //     setSlideWidth('89.47vw');
            //     setSlideHeight('68.42vw');
        } else {
            setSlideWidth('39.73vw');
            setSlideHeight('27.4vw');
        }
    }, [width, height]);
    useEffect(() => {
        if (width / height > 1.8) {
            setSlideWidth('64.44vh');
            setSlideHeight('44.44vh');
            // } else if (width <= 540) {
            //     setSlideWidth('89.47vw');
            //     setSlideHeight('68.42vw');
        } else {
            setSlideWidth('39.73vw');
            setSlideHeight('27.4vw');
        }
    }, []);

    const [isPaused, setIsPaused] = useState(true);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setIsPaused(true);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel='Whitebox information'
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
            // closeTimeoutMS={2000}
        >
            <div className={styles.titleContent}>
                <div className={styles.title}>{getMonth(item.title, false)}</div>
                <AnimatedIconButton
                    type={'button'}
                    variant={'square'}
                    outline={true}
                    color={'brick'}
                    direction='up'
                    onClick={toggleModal}
                    className={styles.closeBtn}
                >
                    <SvgIcons id={'close'} />
                </AnimatedIconButton>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.descriptionsDiv}>
                    <div className={styles.description}>
                        <div className={styles.part}>
                            {video.file && (
                                <div className={styles.switcher}>
                                    <div
                                        className={
                                            activeMediaType === 'images'
                                                ? `${styles.mediaType} ${styles.mediaTypeActive}`
                                                : `${styles.mediaType}`
                                        }
                                        onClick={() => setActiveMediaType('images')}
                                    >
                                        Фото
                                    </div>
                                    <div
                                        className={
                                            activeMediaType === 'video'
                                                ? `${styles.mediaType} ${styles.mediaTypeActive}`
                                                : `${styles.mediaType}`
                                        }
                                        onClick={() => setActiveMediaType('video')}
                                    >
                                        Видео
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.details} dangerouslySetInnerHTML={{ __html: item.text ?? '' }} />
                    </div>
                </div>

                <div className={styles.mediaContainer}>
                    {activeMediaType === 'images' && (
                        <Slider
                            size={'default'}
                            arrow={true}
                            isLoop={true}
                            slideWidth={slideWidth}
                            slideHeight={slideHeight}
                            uniqueKey={'progressModal'}
                            positionArrows={'arrows_center'}
                            arrowsVariant={'round'}
                            navigationColor={'white'}
                            allowTouchMove={true}
                        >
                            {images.map((image, index) => (
                                <React.Fragment key={index}>
                                    <Image src={image.file} alt={''} className={styles.img} fill={true} unoptimized={true} />
                                </React.Fragment>
                            ))}
                        </Slider>
                    )}
					{activeMediaType === 'video' && <VideoContainer isPaused={isPaused} setIsPaused={setIsPaused} video={video} poster={poster} />}
                </div>
            </div>
        </Modal>
    );
};

export default ProgressModal;
