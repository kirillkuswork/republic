import React from 'react';
import IntroSection from './sections/a-intro-section/IntroSection';
import AboutSection from './sections/b-about-section/AboutSection';
import HistorySection from './sections/с-history-section/HistorySection';
import SpicesSection from './sections/d-spices-section/SpicesSection';
import ChildhoodSection from './sections/e-childhood-section/ChildhoodSection';
import YardSection from './sections/f-yard-section/YardSection';
import RestaurantsSection from './sections/g-restaurants-section/RestaurantsSection';
import SpaSection from './sections/h-spa-section/SpaSection';
import BoulevardSection from './sections/i-boulevard-section/BoulevardSection';
import SocietySection from './sections/j-society-section/SocietySection';
import styles from './LifestyleComponent.module.scss';

const LifestyleComponent: React.FC<{}> = ({}) => {
    return (
        <div className={styles.pageWrapper}>
            <IntroSection />
            <AboutSection />
            <HistorySection />
            <SpicesSection />
            <ChildhoodSection />
            <YardSection />
            <RestaurantsSection />
            <SpaSection />
            <BoulevardSection />
            <SocietySection />
        </div>
    );
};

export default LifestyleComponent;
