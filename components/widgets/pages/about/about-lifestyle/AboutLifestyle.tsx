import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSimpleButton from '../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import SvgIcons from '../../../../svgs/SvgIcons';
import ROUTES from '../../../../../constants/routes';
import styles from './AboutLifestyle.module.scss';

const AboutLifestyle: React.FC = () => {
    const textRef = useRef<HTMLElement | null>(null);
    const btnRef = useRef<HTMLElement | null>(null);
    const isTextRefInView = useInView(textRef, { once: true, amount: 0.5 });
    const isBtnRefInView = useInView(btnRef, { once: true, amount: 0.8 });

    return (
        <div className={styles.lifestyle}>
            <div className={styles.background} />
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <motion.section ref={textRef}>
                        <motion.h5
                            className={styles.text}
                            style={{
                                transform: isTextRefInView ? 'none' : 'translateY(100px)',
                                opacity: isTextRefInView ? 1 : 0,
                            }}
                        >
                            Здесь приятно сидеть с&nbsp;друзьями на&nbsp;террасе ресторана и&nbsp;пить лимонад в&nbsp;поп-ап баре, азартно
                            торговаться с&nbsp;продавцом фермерских деликатесов на сезонной ярмарке и&nbsp;восхищаться палитре фестиваля
                            цветов, растить детей и&nbsp;оставаться наедине со&nbsp;своими мыслями.
                        </motion.h5>
                    </motion.section>
                    <motion.section ref={btnRef}>
                        <motion.div className={styles.btn} style={{ opacity: isBtnRefInView ? 1 : 0 }}>
                            <AnimatedSimpleButton text='Лайфстайл' theme='light-outline' link={ROUTES.lifestyle} withIcon>
                                <SvgIcons id='arrow right' />
                            </AnimatedSimpleButton>
                        </motion.div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
};

export default AboutLifestyle;
