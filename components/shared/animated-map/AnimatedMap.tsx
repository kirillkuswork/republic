import React, { useEffect, useState } from 'react';
import pathMapAnimation from '../../../public/images/main-page/path-animation.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { InView, useInView } from 'react-intersection-observer';

export interface IAnimatedMap {}

const AnimatedMap: React.FC<IAnimatedMap> = ({}) => {
    const lottieRef = React.useRef<LottieRefCurrentProps>(null);
    const [showed, setShowed] = useState(false);

    const { ref, inView, entry } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            setShowed(true);
        }
    }, [inView]);

    return <div ref={ref}>{showed && <Lottie lottieRef={lottieRef} animationData={pathMapAnimation} loop={false} autoPlay={false} />}</div>;
};

export default AnimatedMap;
