import React, { useState } from 'react';
import styles from './HousesComponent.module.scss';
import HousesSchema from './houses-schema/HousesSchema';
import HousesSlider from './houses-slider/HousesSlider';

export interface HousesComponent {}

const BaseTemplate: React.FC<HousesComponent> = ({}) => {
    const [activeHouse, setActiveHouse] = useState<'reds' | 'platinum' | 'gold' | 'purple' | 'whites' | 'brown' | 'green' | 'silver'>(
        'reds',
    );
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
    return (
        <div className={styles.container}>
            <HousesSchema
                activeHouse={activeHouse}
                setActiveHouse={setActiveHouse}
                activeSlideIndex={activeSlideIndex}
                setActiveSlideIndex={setActiveSlideIndex}
            />
            <HousesSlider
                activeHouse={activeHouse}
                setActiveHouse={setActiveHouse}
                activeSlideIndex={activeSlideIndex}
                setActiveSlideIndex={setActiveSlideIndex}
            />
        </div>
    );
};

export default BaseTemplate;
