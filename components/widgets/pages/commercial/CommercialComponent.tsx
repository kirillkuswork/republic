import React, { useRef } from 'react';
import { motion, cubicBezier, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import CommercialTop from './commercial-top/CommercialTop';
import CommercialInfo from './commercial-info/CommercialInfo';
import CommercialList from './commercial-list/CommercialList';
import CommercialCallOrder from './commercial-callOrder/CommercialCallOrder';
import Image from 'next/image';
import AnimatedSimpleButton from '../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import SvgIcons from '../../../svgs/SvgIcons';
import styles from './CommercialComponent.module.scss';
import { useAppSelector } from '../../../../hook';

export interface ICommercialComponent {}

const CommercialComponent: React.FC<ICommercialComponent> = ({}) => {
    const widthMobile = useAppSelector((state) => state.main.breakpoint.mobile);
    const width = useAppSelector((state) => state.main.width);

    const sectionRef = useRef<HTMLElement>(null);

    const scale = useMotionValue(1.0);
    const smoothScale = useSpring(1.0, { damping: 15, mass: 0.27, stiffness: 55 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    const smoothY = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });
    const scrollScale = useTransform(smoothY, [0.2, 0.95], [0, 0.05], { ease: cubicBezier(0.6, 0, 0.4, 1) });

    const scaleTemplate = useMotionTemplate`calc(${smoothScale} + ${scrollScale})`;

    return (
        <>
            <CommercialTop />
            <CommercialInfo />
            <CommercialList />
            <CommercialCallOrder />
            <motion.section ref={sectionRef}>
                <motion.div className={styles.bottom}>
                    <motion.div style={{ scale: scaleTemplate }} className={styles.image}>
                        <Image
                            src={width > widthMobile ? '/images/commercial/download.jpg' : '/images/commercial/download-mbl.jpg'}
                            alt={''}
                            fill={true}
                        />
                    </motion.div>
                    <div
                        className={styles.button}
                        onMouseOver={() => {
                            smoothScale.set(1.1);
                        }}
                        onMouseLeave={() => {
                            smoothScale.set(1.0);
                        }}
                    >
                        <AnimatedSimpleButton
                            text={'скачать презентацию в pdf'}
                            theme={'brick-filled'}
                            link={`https://republic.forma.ru/presentation-ggl`}
                            size={'default'}
                            fontSize={'font14'}
                            withIcon={true}
                            iconPosition={'right'}
                            iconAnimation={'down'}
                            target={'_blank'}
                        >
                            <SvgIcons id={'arrow down'} />
                        </AnimatedSimpleButton>
                    </div>
                </motion.div>
            </motion.section>
        </>
    );
};

export default CommercialComponent;
