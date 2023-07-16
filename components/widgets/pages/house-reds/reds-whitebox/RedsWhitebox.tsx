import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import styles from './RedsWhitebox.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { disableBodyScroll, enableBodyScroll } from '../../../../../tools/body-scroll-lock';
import { whiteBoxParts, whiteBoxPartsDetails } from '../../../../../constants/whiteBox';
import IconButton from '../../../../features/buttons/icon-button/IconButton';
import whiteBoxImg from '../../../../../public/images/houses/house-reds/reds-whitebox.jpg';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface RedsWhitebox {
    isOpen: boolean;
    setIsOpen: any;
}

const BaseTemplate: React.FC<RedsWhitebox> = ({ isOpen, setIsOpen }) => {
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    }, [isOpen]);

    const tooltipRightCheck = (left: string) => {
        let leftNumber = Number(left.slice(0, -1));
        if (leftNumber > 66.98) return false;
        return true;
    };

    const [activeTooltip, setActiveTooltip] = useState(0);

	const scrollToTop = () => {
		if(document) {
			const modal = document.querySelectorAll('[aria-label="Whitebox information"]')[0];
			modal.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};

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
                <div className={styles.title}>отделка white box</div>
                <AnimatedIconButton
                    type={'button'}
                    variant={'square'}
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
                <div className={styles.text}>
                    Жители смогут пропустить этап черновых работ во&nbsp;время ремонта.
                    <br />
                    И, тем самым, значительно приблизят свой переезд в&nbsp;новую квартиру.
                </div>

                <div className={styles.imageDiv}>
                    <Image src={whiteBoxImg} alt={''} className={styles.whiteBoxImg} />
                    {whiteBoxPartsDetails.length > 0 && (
                        <>
                            {whiteBoxPartsDetails.map((detail, index) => (
                                <div
                                    key={index}
                                    className={styles.number}
                                    style={{
                                        top: detail.top,
                                        left: detail.left,
                                    }}
                                    onClick={() => setActiveTooltip(detail.number)}
                                    onMouseEnter={() => setActiveTooltip(detail.number)}
                                    onMouseLeave={() => setActiveTooltip(0)}
                                >
                                    {' '}
                                    <IconButton type='number'>
                                        <div>{detail.number}</div>
                                    </IconButton>
                                    <div
                                        className={
                                            activeTooltip === detail.number
                                                ? tooltipRightCheck(detail.left)
                                                    ? `${styles.tooltipText} ${styles.tooltipTextRight}`
                                                    : `${styles.tooltipText} ${styles.tooltipTextLeft}`
                                                : styles.disabled
                                        }
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: detail.title }} />
                                        <div className={styles.tooltipArrow}></div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className={styles.descriptionsDiv}>
                    {whiteBoxPartsDetails.length > 0 && whiteBoxParts.length > 0 && (
                        <>
                            {whiteBoxParts.map((part) => (
                                <div key={part.id} className={styles.description}>
                                    <div className={styles.part}>{part.name}</div>
                                    <div className={styles.details}>
                                        {whiteBoxPartsDetails
                                            .filter((el) => el.partId === part.id)
                                            .map((detail, index) => (
                                                <div className={styles.detail} key={index}>
                                                    <div className={styles.detailIcon}>
                                                        <div>{detail.number}</div>
                                                    </div>
                                                    <div
                                                        className={styles.detailTitle}
                                                        dangerouslySetInnerHTML={{ __html: detail.title }}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

			<AnimatedIconButton
				color="dark-grey-brick"
				direction="up"
				onClick={scrollToTop}
				outline
				type="button"
				variant="square"
				className={styles.arrowUp}
			>
				<SvgIcons id="arrow up" />
			</AnimatedIconButton>

        </Modal>
    );
};

export default BaseTemplate;
