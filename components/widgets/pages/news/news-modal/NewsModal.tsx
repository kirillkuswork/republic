import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import styles from './NewsModal.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { IApiNews } from '../../../../../store/api/apiTypes';
import { getDateString, getMonthString } from '../../../../../tools/get-date-string';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import { useAppSelector } from '../../../../../hook';

export interface NewsModal {
    isOpen: boolean;
    setIsOpen: any;
    item: IApiNews;
}

const BaseTemplate: React.FC<NewsModal> = ({ isOpen, setIsOpen, item }) => {
    const width = useAppSelector((state) => state.main.width);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // useEffect(() => {
    //     if (isOpen) {
    //         disableBodyScroll();
    //     } else {
    //         enableBodyScroll();
    //     }
    // }, [isOpen]);

    // --- disable body scroll while popup is open ----
    const [scrollY, setScrollY] = useState(0);
    const preventDefault = (e: any) => {
        e.preventDefault();
    };
    useEffect(() => {
        let modal = document.querySelector('.SliderModal');
        if (isOpen) {
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
    }, [isOpen]);
    // --------

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel='Whitebox information'
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
            // closeTimeoutMS={2000}
        >
            <div className={styles.titleContent}>
                <div className={styles.dateDiv}>
                    <div className={styles.date}>{getDateString(item.createdAt)}</div>
                    <div className={styles.month}>{getMonthString(item.createdAt)}</div>
                </div>
                <div className={item.type === 'Акция' ? styles.promo : styles.disabled}>% акция</div>
                <div className={styles.title}>{item.title}</div>

                <AnimatedIconButton
                    type={'button'}
                    variant={width < widthTablet ? 'round' : 'square'}
                    outline={true}
                    color={'brick'}
                    direction='up'
                    onClick={() => setIsOpen(false)}
                    className={styles.closeBtn}
                >
                    <SvgIcons id={'close'} />
                </AnimatedIconButton>
            </div>
            <div className={styles.mainContent}>
                <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{
                        __html: item.subtitle || '',
                    }}
                />

                <div className={styles.imageDiv}>
                    <img src={`${item.fullUrl}/public/news/${item.fileUrl}`} alt={''} className={styles.modalImg} />
                </div>

                <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{
                        __html: item.content || '',
                    }}
                />
            </div>
        </Modal>
    );
};

export default BaseTemplate;
