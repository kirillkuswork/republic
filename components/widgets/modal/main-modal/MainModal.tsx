import React, { useEffect } from 'react';
import styles from './MainModal.module.scss';
import Modal, { Classes } from 'react-modal';
import SvgIcons from '../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../hook';
import AnimatedIconButton from '../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface IMainModal {
    iconMobileId: 'close-modal-small-light' | 'circle-stroke-close-brick';
    iconDesktopId: 'close-modal-large-light' | 'close-modal-large-transparent-gold';
    theme: 'light' | 'dark' | 'dark-light';
    modalClassName?: string | Classes | undefined;
    overlayClassName?: string | Classes | undefined;
    show: boolean;
    children: React.ReactNode;
    closeModal: () => void;
    closeFixed?: boolean;
	blockScroll?: boolean;
}

const MainModal: React.FC<IMainModal> = ({
    theme,
    show,
    children,
    iconDesktopId,
    iconMobileId,
    closeModal,
    overlayClassName,
    modalClassName,
    closeFixed,
	blockScroll = false,
}) => {
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);

    const handleClick = () => {
        closeModal();
    };

	useEffect(() => {
		if (blockScroll) {
			if (show) {
                window.scrollTo(0, scrollY);
				document.documentElement.classList.add('is-locked');
			} else {
				document.documentElement.classList.remove('is-locked');
			}
		}
	}, [show]);

    return (
        <Modal
            isOpen={show}
            className={`${modalClassName ? modalClassName : styles.modal} ${styles[theme]} `}
            overlayClassName={overlayClassName}
            closeTimeoutMS={200}
            ariaHideApp={false}
            onRequestClose={closeModal}
        >
            <AnimatedIconButton
                type={'button'}
                variant={width < widthTablet ? 'round' : 'square'}
                outline={true}
                color={'brick'}
                direction='up'
                onClick={handleClick}
                className={`${styles.close} ${closeFixed ? styles.fixed : ''}`}
            >
                <SvgIcons id={'close'} />
            </AnimatedIconButton>
            <div className={styles.container}>{children}</div>
        </Modal>
    );
};

export default MainModal;
