import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HousePageSelect.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../../hook';
import getScaledSizeSecond from '../../../../../tools/getScaledSizeSecond';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface HousePageSelect {
    selectData: {
        title: string;
        titleMobile: string;
        img: string;
        imgMobile: string;
        link: string;
    };
}

const BaseTemplate: React.FC<HousePageSelect> = ({ selectData }) => {
    const width = useAppSelector((state) => state.main.width);

    const selectContainerRef = React.useRef<HTMLDivElement>(null);
    const isInViewContainer = useInView(selectContainerRef, { once: false });

    return (
        <section className={styles.container} ref={selectContainerRef}>
            {/* <picture> */}
            {/* <source media='(max-width:540px)' srcSet={selectData.imgMobile} /> */}
            <motion.img
                className={styles.picture}
                src={width > 540 ? selectData.img : selectData.imgMobile}
                alt=''
                style={{
                    // transform: isInViewContainer ? 'none' : `translateX(${getScaledSizeSecond(550, width)}px)`,
                    scale: isInViewContainer ? 1.1 : 1,
                    transition: 'all 4s ease 0.5s',
                }}
            />
            {/* </picture> */}
            <div className={styles.contain}>
                {width > 540 ? (
                    <div
                        className={styles.text}
                        dangerouslySetInnerHTML={{
                            __html: selectData.title,
                        }}
                    />
                ) : (
                    <div
                        className={styles.text}
                        dangerouslySetInnerHTML={{
                            __html: selectData.titleMobile,
                        }}
                    />
                )}

                <AnimatedIconButton
                    type={'Link'}
                    href={`${selectData.link}`}
                    variant='square'
                    outline={false}
                    color={'dark-grey-brick'}
                    direction='right'
                    className={styles.animated_button}
                >
                    <SvgIcons id={'arrow right'} />
                </AnimatedIconButton>
            </div>
        </section>
    );
};

export default BaseTemplate;
