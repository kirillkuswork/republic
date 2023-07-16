import React from 'react';
import styles from './AsideModal.module.scss';
import { Slide } from 'transitions-kit';

export interface IAsideModal {
    show: boolean;
    childrenTop: React.ReactNode;
    childrenBottom1: React.ReactNode;
    childrenBottom2: React.ReactNode;
    direction: 'left' | 'right';
    bgColor: 'white' | 'light' | 'darker-light';
}

const AsideModal: React.FC<IAsideModal> = ({ show, childrenTop, childrenBottom1, childrenBottom2, direction, bgColor }) => {
    return (
        <Slide in={show} direction={direction}>
            <div className={`${styles.container} ${direction === 'left' ? styles.right : styles.left}`}>
                <div className={`${styles.wrapper} ${styles[bgColor.replace('-', '_')]}`}>
                    <nav className={styles.top}>{childrenTop}</nav>
                    <nav className={styles.bottom}>
                        <div className={styles.bottom__first}>{childrenBottom1}</div>
                        <div className={styles.bottom__last}>{childrenBottom2}</div>
                    </nav>
                </div>
            </div>
        </Slide>
    );
};

export default AsideModal;
