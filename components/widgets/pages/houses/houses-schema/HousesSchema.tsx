import React from 'react';
import styles from './HousesSchema.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import MiniMap from '../../../../svgs/MiniMap/MiniMap';
import { isMobile } from 'react-device-detect';
import { useAppSelector } from '../../../../../hook';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface HousesSchema {
    activeHouse: 'reds' | 'platinum' | 'gold' | 'purple' | 'whites' | 'brown' | 'green' | 'silver';
    setActiveHouse: any;

    activeSlideIndex: number;
    setActiveSlideIndex: any;
}

const BaseTemplate: React.FC<HousesSchema> = ({ activeHouse, setActiveHouse, activeSlideIndex, setActiveSlideIndex }) => {
    const houses = useAppSelector((state) => state.main.sections);
    const handlePrevSlide = () => {
        if (activeSlideIndex !== 0) {
            setActiveSlideIndex(activeSlideIndex - 1);
        }
    };

    const handleNextSlide = () => {
        if (activeSlideIndex !== houses.length - 1) {
            setActiveSlideIndex(activeSlideIndex + 1);
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <p className={styles.title}>
                    найдите свой <br />
                    дом в&nbsp;republic
                </p>
                <div className={isMobile ? styles.disabled : styles.arrows}>
                    <AnimatedIconButton
                        type={'button'}
                        variant='round'
                        outline={true}
                        color={'white-brick'}
                        direction='left'
                        // className={`arrow-prev-houses`}
                        onClick={handlePrevSlide}
                    >
                        <SvgIcons id={'arrow left'} />
                    </AnimatedIconButton>
                    <AnimatedIconButton
                        type={'button'}
                        variant='round'
                        outline={true}
                        color={'white-brick'}
                        direction='right'
                        onClick={handleNextSlide}
                        // className={`arrow-next-houses`}
                    >
                        <SvgIcons id={'arrow right'} />
                    </AnimatedIconButton>
                </div>
            </div>
            {/* <FormaLogo id="smallPlan" /> */}
            <div className={styles.map}>
                <MiniMap houseName={activeHouse} setActiveHouse={setActiveHouse} theme='dark' />
            </div>
        </div>
    );
};

export default BaseTemplate;
