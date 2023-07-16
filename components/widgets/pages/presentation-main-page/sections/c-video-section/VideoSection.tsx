import React, { useState } from 'react';
import styles from './VideoSection.module.scss';
import { motion } from 'framer-motion';
import { usePageScroll } from '../../../../../shared/page-scroll/PageScroller';
import {
    IAnimation,
    responsive,
    reverseAnimation,
    transition1100,
    transition1800,
    transition2200,
    transition900,
} from '../../../../../shared/page-scroll/animation_helpers';

type IVideoSectionAnimations = {
    [key in 'bg']?: IAnimation;
};

//Переход к странице
const fromPrevPage: IVideoSectionAnimations = {
    bg: {
        initial: { x: 0 },
        animate: { x: -1460 },
        transition: transition1100,
        responsive: { x: 'vw1460' },
    },
};
//К след. странице
const toNextPage: IVideoSectionAnimations = {
    bg: {
        initial: { x: -1460 },
        animate: { x: -1460 - 980 },
        transition: transition900,
        responsive: { x: 'vw1460' },
    },
};

const VideoSection: React.FC<{}> = ({}) => {
    const [animations, setAnimations] = useState<IVideoSectionAnimations>({});
    const pageScroll = usePageScroll();

    React.useEffect(() => {
        pageScroll.addStage(5, {
            slideIn: (forward) => {
                if (forward) {
                    setAnimations(responsive(fromPrevPage));
                    return 1100;
                } else {
                    setAnimations(reverseAnimation(responsive(toNextPage)));
                    return 900;
                }
            },
            slideOut: (forward) => {
                if (forward) {
                    setAnimations(responsive(toNextPage));
                    return 900;
                } else {
                    setAnimations(reverseAnimation(responsive(fromPrevPage)));
                    return 1100;
                }
            },
        });
    }, [pageScroll]);

    return (
        <motion.div className={styles.wrapper} {...animations.bg}>
            <video playsInline autoPlay loop muted data-keepplaying>
                <source src={'/videos/republic.webm' || '/videos/republic.mp4'} />

                <source src={'/videos/republic.mp4'} type='video/mp4'></source>
                <source src={'/videos/republic.webm'} type='video/webm'></source>
            </video>
        </motion.div>
    );
};

export default VideoSection;
