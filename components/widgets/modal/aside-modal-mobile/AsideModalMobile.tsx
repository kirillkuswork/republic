import React from 'react';
import { Slide } from 'transitions-kit';
import SvgIcons from '../../../svgs/SvgIcons';
import styles from './AsideModalMobile.module.scss';
import Image, { StaticImageData } from 'next/image';

export interface IAsideModalMobile {
    show: boolean;
    close: () => void;
    title: string;
    text: string;
    number: string;
    img: string | StaticImageData;
    bgColor: 'white' | 'light' | 'darker-light';
    setActiveRoom: any;
    activeRoom: number;
    roomMaxNum: number;
    roomMinNum: number;
    logo?: string;
}

const AsideModalMobile: React.FC<IAsideModalMobile> = ({
    show,
    close,
    title,
    text,
    number,
    img,
    bgColor,
    setActiveRoom,
    activeRoom,
    roomMaxNum,
    roomMinNum,
    logo,
}) => {
    // --- disable body scroll while popup is open ----
    const [scrollY, setScrollY] = React.useState(0);
    const preventDefault = (e: any) => {
        e.preventDefault();
    };
    React.useEffect(() => {
        let modal = document.querySelector('.SliderModal');
        if (show) {
            setScrollY(window.scrollY);
            document.documentElement.classList.add('is-locked');
            modal?.classList.add('is-open');
            // block pointer events
            modal?.addEventListener('pointermove', preventDefault);
        } else {
            document.documentElement.classList.remove('is-locked');
            modal?.classList.remove('is-open');
            modal?.removeEventListener('pointermove', preventDefault);
            // restore scroll position
            window.scrollTo(0, scrollY);
        }
    }, [show]);
    // --------

    const openNextRoom = () => {
        if (activeRoom === roomMaxNum) {
            setActiveRoom(roomMinNum);
        } else {
            setActiveRoom(activeRoom + 1);
        }
    };

    const openPrevRoom = () => {
        if (activeRoom === roomMinNum) {
            setActiveRoom(roomMaxNum);
        } else {
            setActiveRoom(activeRoom - 1);
        }
    };

    return (
        <Slide in={show} direction={'right'}>
            <div className={`${styles.container}`}>
                <div className={`${styles.wrapper} ${styles[bgColor.replace('-', '_')]}`}>
                    <div className={styles.closeBtnMobile} onClick={close}>
                        <SvgIcons id='circle-stroke-close-brick' />
                    </div>

                    <div>
                        <div dangerouslySetInnerHTML={{ __html: title }} className={styles.title} />
                        {logo && <img src={logo} alt="" className={styles.logo}/>}
                        {!logo && <div className={styles.logoDiv}/>}
                        <div dangerouslySetInnerHTML={{ __html: text }} className={styles.text} />
                    </div>

                    <div>
                        <div className={styles.number}>{number}</div>
                        <div className={styles.imgDiv}>
                            <div className={styles.arrows}>
                                <div onClick={() => openPrevRoom()}>
                                    <SvgIcons id={'arrow prev dark stroke medium div'} />
                                </div>
                                <div onClick={() => openNextRoom()}>
                                    <SvgIcons id={'arrow next dark stroke medium div'} />
                                </div>
                            </div>
                            <Image src={img} alt={''} fill={true} sizes={'80vw'} />
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
};

export default AsideModalMobile;
