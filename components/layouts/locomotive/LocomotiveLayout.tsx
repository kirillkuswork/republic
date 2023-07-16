import React, { useRef } from 'react';
import styles from './LocomotiveLayout.module.scss';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import Header, { IHeader } from '../header/Header';
import Footer from '../footer/Footer';
import ScrollTriggerProxy from '../../../tools/ScrollTriggerProxy';
import { isMobileOnly, isTablet } from 'react-device-detect';

export interface ILocomotiveLayout {
    children: React.ReactNode;
    theme: 'light' | 'dark' | 'dark-light' | 'transparent';
    header: IHeader;
    footer: boolean;
    pathname?: string;
}

const LocomotiveLayout: React.FC<ILocomotiveLayout> = ({ children, theme, header, footer }) => {
    const containerRef = useRef(null);
    console.log(isMobileOnly);
    console.log(isTablet);
    return (
        <>
            <Header {...header} />
            {!isMobileOnly && !isTablet && (
                <LocomotiveScrollProvider
                    options={{
                        smooth: true,
                    }}
                    containerRef={containerRef}
                >
                    <ScrollTriggerProxy />
                    <main data-scroll-container={true} ref={containerRef} className={styles.container + ` ${styles[theme]}`}>
                        {children}
                    </main>
                    {footer && <Footer />}
                </LocomotiveScrollProvider>
            )}
            {/*На мобилке и планшете отключаем локомотив*/}
            {(isMobileOnly || isTablet) && (
                <>
                    <main className={styles.container + ` ${styles[theme]}`}>{children}</main>
                    {footer && <Footer />}
                </>
            )}
        </>
    );
};

export default LocomotiveLayout;
