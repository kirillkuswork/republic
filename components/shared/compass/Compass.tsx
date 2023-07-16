import React from 'react';
import styles from './Compass.module.scss';
import SvgIcons from '../../svgs/SvgIcons';

export interface ICompass {
    rotate?: boolean;
}

const Compass: React.FC<ICompass> = ({ rotate }) => {
    return (
        <span className={`${styles.component} ${rotate ? styles.rotate : ''}`}>
            {rotate ? <SvgIcons id={'compass-rotate'} /> : <SvgIcons id={'compass'} />}
        </span>
    );
};

export default Compass;
