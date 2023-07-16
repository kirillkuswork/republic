import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ProgressCameraModal.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../../hook';
import { disableBodyScroll, enableBodyScroll } from '../../../../../tools/body-scroll-lock';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface ProgressCameraModal {
    isOpen: boolean;
    setIsOpen: any;
    link: string;
}

const ProgressCameraModal: React.FC<ProgressCameraModal> = ({ isOpen, setIsOpen, link }) => {
    // заморозить область за модальным если оно открыто
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
      } else {
        document.body.style.overflow = "visible";
        document.body.style.position = "";
      }

    }, [isOpen])

    const width = useAppSelector((state) => state.main.width);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel='Whitebox information'
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
        >
            <div className={styles.content}>
                <AnimatedIconButton
                    type={'button'}
                    variant={width < 541 ? 'round' : 'square'}
                    outline={true}
                    color={'grey'}
                    direction='up'
                    onClick={toggleModal}
                    className={styles.closeBtn}
                >
                    <SvgIcons id={'close'} />
                </AnimatedIconButton>
                <div className={styles.videoContainer}>
                    <iframe src={link} className={styles.video} allowFullScreen />
                </div>
            </div>
        </Modal>
    );
};

export default ProgressCameraModal;
