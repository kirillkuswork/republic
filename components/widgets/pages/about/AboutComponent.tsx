import React from 'react';
import Header from '../../../layouts/header/Header';
import Footer from '../../../layouts/footer/Footer';
import AboutIntro from './about-intro/AboutIntro';
import AboutHistory from './about-history/AboutHistory';
import AboutLegend from './about-legend/AboutLegend';
import AboutArchitecture from './about-architecture/AboutArchitecture';
import AboutWalk from './about-walk/AboutWalk';
import AboutLifestyle from './about-lifestyle/AboutLifestyle';
import AboutTeam from './about-team/AboutTeam';
import styles from './AboutComponent.module.scss';
import DefaultHead from '../../../shared/head/DefaultHead';

export interface IAboutComponent {}

const AboutComponent: React.FC<IAboutComponent> = () => {
    return (
        <>
            <DefaultHead />
            <Header theme='transparent' />
            <AboutIntro />
            <AboutHistory />
            <AboutLegend />
            <AboutArchitecture />
            <AboutWalk />
            <AboutLifestyle />
            <AboutTeam />
            <div className={styles.footer}>
                <Footer />
            </div>
        </>
    );
};

export default AboutComponent;
