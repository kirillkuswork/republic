import React, { useRef, useState } from 'react';
import styles from './CardContent.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { Slide } from 'transitions-kit';
import ROUTES from '../../../../../constants/routes';
import { isMobileOnly } from 'react-device-detect';
import MainModal from '../../../modal/main-modal/MainModal';
import { disableBodyScroll, enableBodyScroll } from '../../../../../tools/body-scroll-lock';
import SimpleCard from '../../../cards/simple-card/SimpleCard';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import AnimatedSimpleButton from '../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

interface ICardContent {
    type: 'mortgage' | 'comfort_mortgage' | 'installment' | 'online' | 'trade_in' | 'trade_in_dekstop' | 'transparent_cards';
    title: string;
    rate?: string;
    desc?: string | null;
    id?: number;
    icon?: string;
    details_desc?: string | null;
    button?: boolean;
    type_button?: string | null;
    btnName?: string;
    btnLink?: string;
}

const CardContent: React.FC<ICardContent> = ({
    title,
    type,
    rate,
    desc,
    id,
    icon,
    details_desc,
    button,
    type_button,
    btnName,
    btnLink,
}) => {
    const refElem = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [scrollHide, setScrollHide] = useState(true);
    const openModal = () => {
        window.scrollTo(0, window.scrollY - 1);
        disableBodyScroll();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        enableBodyScroll();
    };
    const openSlide = () => {
        setOpen(!open);
        setTimeout(() => {
            if (!open) {
                setScrollHide(false);
            } else setScrollHide(true);
        }, 100);
    };
    const closeSlide = () => {
        setOpen(!open);
        setScrollHide(true);
    };

    const styleScroll = scrollHide ? styles.card__scroll_hide : '';

    return (
        <>
            {type === 'mortgage' && (
                <>
                    <SimpleCard theme='light' className={styles.card_mini}>
                        <div className={`${styles.card_content} ${styles.card__mortgage} ${styleScroll}`} ref={refElem}>
                            {!open && (
                                <Slide in={true} direction='down' appear={false}>
                                    <div>
                                        <h5 className={styles.h5} dangerouslySetInnerHTML={{ __html: title }}></h5>
                                    </div>
                                </Slide>
                            )}
                            {open && (
                                <Slide in={true} direction='up' container={refElem.current}>
                                    <div className={styles.card_desc} dangerouslySetInnerHTML={{ __html: desc ?? '' }}></div>
                                </Slide>
                            )}
                            <div className={styles.card_icon}>
                                {open ? (
                                    <AnimatedIconButton
                                        key={'close'}
                                        type={'button'}
                                        variant={'round'}
                                        outline={false}
                                        color={'brick'}
                                        direction='up'
                                        onClick={() => (!isMobileOnly ? closeSlide() : openModal())}
                                        className={styles.card_icon_btn}
                                    >
                                        <SvgIcons id={'close'} />
                                    </AnimatedIconButton>
                                ) : (
                                    <AnimatedIconButton
                                        key={'open'}
                                        type={'button'}
                                        variant={'round'}
                                        outline={false}
                                        color={'grey'}
                                        direction='up'
                                        onClick={() => (!isMobileOnly ? openSlide() : openModal())}
                                        className={styles.card_icon_btn}
                                    >
                                        <SvgIcons id={'plus'} />
                                    </AnimatedIconButton>
                                )}
                            </div>
                        </div>
                    </SimpleCard>
                    <MainModal
                        theme={'light'}
                        show={showModal}
                        iconMobileId={'circle-stroke-close-brick'}
                        iconDesktopId={'close-modal-large-light'}
                        closeModal={() => closeModal()}
                        blockScroll={true}
                    >
                        <div className={styles.modal}>
                            <div className={styles.modal__header}>
                                <h4 className={styles.h5} dangerouslySetInnerHTML={{ __html: title }}></h4>
                            </div>
                            <div className={styles.modal__content}>
                                <div className={styles.modal__desc} dangerouslySetInnerHTML={{ __html: desc ?? '' }}></div>
                            </div>
                        </div>
                    </MainModal>
                </>
            )}
            {type === 'comfort_mortgage' && (
                <SimpleCard theme='light' className={styles.card_medium}>
                    <div className={styles.card_content}>
                        <div>
                            <h5 className={styles.h5} dangerouslySetInnerHTML={{ __html: id == 6 ? title + rate + '%' : title }}></h5>
                            {desc && <div className={styles.card_desc}>{desc}</div>}
                        </div>
                        <div className={styles.card_number}>
                            <span className={styles.h1}>{id}</span>
                        </div>
                        <div className={styles.card_icon}>
                            <img src={icon} alt={'icon' + id} />
                        </div>
                    </div>
                </SimpleCard>
            )}
            {type === 'installment' && (
                <SimpleCard theme='light' className={styles.card_medium_dinamic_content}>
                    <div className={styles.card_content}>
                        <h5 className={styles.h5}>{title}</h5>
                        <div className={styles.content_installment_special} dangerouslySetInnerHTML={{ __html: desc ?? '' }}></div>
                    </div>
                </SimpleCard>
            )}
            {type === 'online' && (
                <SimpleCard theme='light' className={styles.card_large}>
                    <div className={styles.card_content_large}>
                        <div className={styles.card_header}>
                            <h4 className={styles.h4}>{title}</h4>
                            {desc && <div className={styles.card_desc_large}>{desc}</div>}
                            {details_desc && <div className={styles.card_desc_large}>{details_desc}</div>}
                            {button && type_button === 'button' && (
                                <div className={styles.card_btn}>
                                    <AnimatedSimpleButton
                                        text='Выбрать квартиру'
                                        theme='dark-outline'
                                        link={`${ROUTES.list}`}
                                        withIcon={true}
                                        iconAnimation={'right'}
                                        iconPosition={'right'}
                                        size={'default'}
                                    >
                                        <SvgIcons id='arrow right' />
                                    </AnimatedSimpleButton>
                                </div>
                            )}
                        </div>
                        <div className={styles.card_number}>
                            <span className={styles.h1}>{id}</span>
                        </div>
                    </div>
                </SimpleCard>
            )}
            {(type === 'trade_in' || type === 'trade_in_dekstop') && (
                <SimpleCard theme='light' className={type === 'trade_in_dekstop' ? styles.card_medium_dekstop : styles.card_medium}>
                    <div className={styles.card_content}>
                        <div>
                            <h5 className={styles.h5} dangerouslySetInnerHTML={{ __html: title }}></h5>
                            {desc && <div className={styles.card_desc}>{desc}</div>}
                        </div>
                        {btnName && btnLink && (
                            <div className={styles.card_comfortMortgageBtn}>
                                <AnimatedSimpleButton
                                    text={btnName}
                                    theme='dark-outline'
                                    link={btnLink}
                                    withIcon={true}
                                    iconAnimation={'right'}
                                    iconPosition={'right'}
                                    size={'default'}
                                >
                                    <SvgIcons id='arrow right' />
                                </AnimatedSimpleButton>
                            </div>
                        )}
                        <div className={styles.card_number}>
                            <span className={styles.h1}>{id}</span>
                        </div>
                    </div>
                </SimpleCard>
            )}
            {type === 'transparent_cards' && (
                <SimpleCard theme='outline-dark-grey' className={styles.card_small}>
                    <div className={styles.card_content}>
                        <div className={styles.card_small_padding}>
                            <h5 className={styles.h5_brick} dangerouslySetInnerHTML={{ __html: title }}></h5>
                            {desc && <div className={styles.card_desc_small} dangerouslySetInnerHTML={{ __html: desc }} />}
                            {icon && (
                                <div className={styles.card_small_icon}>
                                    <img src={icon} alt={'icon' + id} />
                                </div>
                            )}
                        </div>
                    </div>
                </SimpleCard>
            )}
        </>
    );
};

export default CardContent;
