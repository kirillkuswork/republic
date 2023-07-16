import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProgressCard.module.scss';
import { isMobileOnly, isTablet } from 'react-device-detect';
import { IApiProgress } from '../../../../../store/api/apiTypes';
import SimpleCard from '../../../cards/simple-card/SimpleCard';
import SvgIcons from '../../../../svgs/SvgIcons';
import IconButton from '../../../../features/buttons/icon-button/IconButton';
import { getMonth } from '../../../../../tools/get-string-month';
import { useAppSelector } from '../../../../../hook';
import { disableBodyScroll, enableBodyScroll } from '../../../../../tools/body-scroll-lock';
import SliderModal from '../../../slider-modal/SliderModal';
import MainModal from '../../../modal/main-modal/MainModal';
import Slider from '../../../slider/Slider';
import SliderHand from '../../../../shared/slider-hand/SliderHand';
// @ts-ignore
// import { Player, BigPlayButton, ControlBar, PlayToggle, CurrentTimeDisplay, TimeDivider } from 'video-react';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import ProgressModal from '../progress-modal/ProgressModal';
import VideoContainer from '../../../video-container/VideoContainer';

interface IProgressCard {
    progress: IApiProgress;
}

const ProgressCard: React.FC<IProgressCard> = ({ progress }) => {
    const [ishover, setHover] = useState<boolean>(false);
    const [isPopUp, setPopUp] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setPopUp(true);
        disableBodyScroll();
    };
    const closeModal = () => {
        setPopUp(false);
        enableBodyScroll();
        setIsPaused(true);
    };
    const files = progress.fileUrl?.map((item, index) => {
        return {
            file: item,
            type: progress.mimeType[index],
        };
    }) || [
        {
            file: '',
            type: '',
        },
    ];
    const video = files?.find((item) => item.type.split('/')[0] === 'video') || { file: '', type: '' };
    const width = useAppSelector((state) => state.main.width);
    const poster = progress.preViewVideo ? progress.preViewVideo.replace(/ /g, '%20') : files[0]?.file;
    const [activeMediaType, setActiveMediaType] = useState('images');
    const [isPaused, setIsPaused] = useState(true);

    return (
        <>
            <SimpleCard
                theme={'outline-dark-grey'}
                className={styles.card}
                // onClick={() => (!isMobileOnly && !isTablet ? setShowModal(!showModal) : openModal())}
                onClick={() => (width > 540 ? setShowModal(!showModal) : openModal())}
            >
                <div
                    className={styles.card__img}
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${progress.fileUrl[0]})`,
                    }}
                >
                    <div className={styles.card__container}>
                        <div className={styles.card__footer}>
                            <div className={styles.card__title}>{getMonth(progress.title, false)}</div>
                            <div className={styles.card__button}>
                                <AnimatedIconButton
                                    type={'button'}
                                    variant={'round'}
                                    outline={true}
                                    color={'white-brick'}
                                    size={'default'}
                                    direction={!isMobileOnly && !isTablet ? 'right' : 'up'}
                                >
                                    <SvgIcons id={!isMobileOnly && !isTablet ? 'arrow right' : 'arrow up'} />
                                </AnimatedIconButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.card__hover_content}>
                    <div className={styles.card__container}>
                        <div className={styles.card__content}>
                            <div className={`${styles.card__desc} ${styles.description}`} dangerouslySetInnerHTML={{ __html: progress.text ?? '' }}></div>
                        </div>
                        <div className={styles.card__footer}>
                            <div className={styles.card__title__dark}>{getMonth(progress.title, false)}</div>
                            <div className={styles.card__button}>
                                <AnimatedIconButton
                                    type={'button'}
                                    variant={'round'}
                                    outline={true}
                                    color={'dark-grey-brick'}
                                    size={'default'}
                                    direction={!isMobileOnly && !isTablet ? 'right' : 'up'}
                                >
                                    <SvgIcons id={!isMobileOnly && !isTablet ? 'arrow right' : 'arrow up'} />
                                </AnimatedIconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </SimpleCard>
            {/* {progress.fileUrl.length > 0 && (
                <SliderModal
                    isOpen={showModal}
                    setIsOpen={setShowModal}
                    arrow={progress.fileUrl.length > 1}
                    isLoop={progress.fileUrl.length > 1}
                    isKeyboardEnabled={true}
                    firstSlide={0}
                    photos={files}
                    multitype={true}
                />
            )} */}

			{!isMobileOnly && (
            <ProgressModal isOpen={showModal} setIsOpen={setShowModal} item={progress} files={files} poster={poster} />
			)}

			{isMobileOnly && (
            <MainModal
                theme={'light'}
                show={isPopUp}
                iconMobileId={'circle-stroke-close-brick'}
                iconDesktopId={'close-modal-large-light'}
                closeModal={() => closeModal()}
                closeFixed={true}
            >
                <div className={styles.modal}>
                    <div className={styles.modal__header}>
                        <h4 className={styles.modal__title}>{getMonth(progress.title, false)}</h4>
                    </div>
                    <div className={styles.modal__content}>
                        <div className={`${styles.modal__desc} ${styles.description}`} dangerouslySetInnerHTML={{ __html: progress.text ?? '' }}></div>
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
                        <div className={styles.modal__card_container}>
                            {activeMediaType === 'images' && progress.fileUrl.length > 0 && (
                                <Slider
                                    size={'content'}
                                    arrow={true}
                                    isLoop={true}
                                    navigationOutline={true}
                                    uniqueKey={'progressCard'}
                                    positionArrows={'arrows_center'}
                                    arrowsVariant={'round'}
                                    navigationColor={'white'}
                                    allowTouchMove={true}
                                >
                                    {files.map((item, i, row) => {
                                        const type = item.type.split('/');
                                        if (type[0] !== 'video') {
                                            return (
                                                <SimpleCard
                                                    theme={'outline-dark-grey'}
                                                    className={styles.modal__card}
                                                    style={{
                                                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${item.file})`,
                                                    }}
                                                    key={i}
                                                ></SimpleCard>
                                            );
                                        }
                                    })}
                                </Slider>
                            )}
                        </div>
						{activeMediaType === 'video' && <VideoContainer isPaused={isPaused} setIsPaused={setIsPaused} video={video} poster={poster} />}
                    </div>
                </div>
            </MainModal>
			)}

        </>
    );
};

export default ProgressCard;
