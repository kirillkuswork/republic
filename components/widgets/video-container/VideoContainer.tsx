import React, { useEffect } from 'react';
import styles from './VideoContainer.module.scss';

export interface IVideoContainer {
    video: { file: string; type: string };
    isPaused: boolean;
    setIsPaused: any;
	poster?: string;
}

const VideoContainer: React.FC<IVideoContainer> = ({ video, isPaused, setIsPaused, poster }) => {
    console.log(video);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const handleVideoPlay = () => {
        if (isPaused) {
            setIsPaused(false);
            videoRef?.current?.play();
        } else {
            setIsPaused(true);
            videoRef?.current?.pause();
        }
    };

	useEffect(() => {
        return function () {
			setIsPaused(true);
			videoRef?.current?.pause();
        };
    }, []);

    return (
        <div className={styles.videoContainer}>
            <video width='100%' height='100%' ref={videoRef} onClick={() => handleVideoPlay()} playsInline poster={poster}>
                <source src={video?.file} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <div className={isPaused ? styles.playBtn : styles.disabled} onClick={() => handleVideoPlay()}>
                <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect y='60' width='60' height='60' rx='30' transform='rotate(-90 0 60)' fill='#F9F5F3' />
                    <path d='M23 20V40L42 30L23 20Z' fill='#AD7C53' />
                </svg>
            </div>
        </div>
    );
};

export default VideoContainer;
