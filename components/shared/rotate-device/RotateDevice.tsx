import React from 'react';
import { useMobileOrientation, deviceType } from 'react-device-detect';
import { disableBodyScroll, enableBodyScroll } from '../../../tools/body-scroll-lock';
import useMediaQuery from '../../../tools/hooks/useMediaQuery';
import styles from './RotateDevice.module.scss';

const RotateDevice: React.FC = () => {
    const { isLandscape } = useMobileOrientation();
    const matchesMobile = useMediaQuery('(max-width: 950px)');

    const component = (
        <div className={styles.container}>
            <p className={styles.text}>Пожалуйста, переверните устройство.</p>
            <p className={styles.text}>Это необходимо для корректного отображения сайта.</p>
        </div>
    );

    if (deviceType === 'mobile' && isLandscape && matchesMobile) {
        disableBodyScroll();
        return <>{component}</>;
    } else {
        enableBodyScroll();
        return null;
    }
};

export default RotateDevice;
