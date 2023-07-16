import React, { useEffect, useRef, useState } from 'react';
import styles from './MobileFlatSection.module.scss';
import { motion } from 'framer-motion';
import IconButton from '../../../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import ROUTES from '../../../../../../constants/routes';

const MobileFlatSection: React.FC<{}> = ({}) => {
    return (
        <>
            <motion.div className={styles.wrapper} id='flat_wrapper'>
                <div className={styles.content_wrapper}>
                    <div className={styles.contain}>
                        <div className={styles.text}>
                            выбрать свою
                            <br />
                            квартиру
                        </div>
                        <div className={styles.button}>
                            <IconButton link={`${ROUTES.list}`} type={'Link'}>
                                <SvgIcons id='arrow next dark large' />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default MobileFlatSection;
