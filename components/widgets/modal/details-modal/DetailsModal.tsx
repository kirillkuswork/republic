import React from 'react';
import styles from './DetailsModal.module.scss';
import MainModal from '../main-modal/MainModal';
import SvgIcons from '../../../svgs/SvgIcons';
import 'swiper/css';

//@ts-ignore
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import useIsomorphicLayoutEffect from '../../../../tools/hooks/useIsomorphicLayoutEffect';

export interface IDetailsModal {
    show: boolean;
    title: string;
    location: string;
    children?: React.ReactNode;

    closeDetailsModal: () => void;
}

const DetailsModal: React.FC<IDetailsModal> = ({ show, title, location, children, closeDetailsModal }) => {
    useIsomorphicLayoutEffect(() => {
        const body = document.querySelector('body');

        if (show) {
            body?.classList.add('no-scrollbar');

            setTimeout(() => {
                const modal = document.querySelector(`.${styles.modal}`);

                disablePageScroll(modal);
            }, 200);
        } else {
            body?.classList.remove('no-scrollbar');
            enablePageScroll();
        }
    }, [show]);

    return (
        <div className={styles.detailsModal}>
            <MainModal
                theme={'light'}
                show={show}
                iconMobileId={'circle-stroke-close-brick'}
                iconDesktopId={'close-modal-large-transparent-gold'}
                closeModal={() => closeDetailsModal()}
                modalClassName={styles.modal}
                overlayClassName={styles.overlay}
            >
                <>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.location}>
                        <SvgIcons id={'pin'} />
                        <p className={styles.location__text}>{location}</p>
                    </div>
                    {children}
                </>
            </MainModal>
        </div>
    );
};

export default DetailsModal;
