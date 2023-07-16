import React from 'react';
import styles from './TermsFullPayment.module.scss';
import SvgIcons from '../../../../../svgs/SvgIcons';
import SimpleButton from '../../../../../features/buttons/simple-button/SimpleButton';
import ROUTES from '../../../../../../constants/routes';
import full from '../../../../../../public/images/terms/full.png';
import full_m from '../../../../../../public/images/terms/full_m.png';
import { isMobileOnly } from 'react-device-detect';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
interface ITermsFullPayment {}

const TermsFullPayment: React.FC<ITermsFullPayment> = ({}) => {
    return (
        <>
            <section className={styles.section_container}>
                <div className={styles.payment_block}>
                    <div className={styles.section_header}>
                        <h4 className={styles.h4}>
                            Специальные условия при покупке со 100% оплатой. Подробности у экспертов по подбору недвижимости Republic.
                        </h4>
                        <div className={styles.btn_block}>
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
                    </div>
                    <div className={styles.wrapper_img}>
                        <img className={styles.img_object} src={isMobileOnly ? full_m.src : full.src} alt='full_bg' />
                        <div className={styles.img_text_block}>
                            {!isMobileOnly && (
                                <>
                                    <div className={styles.img_text}>оплата</div>
                                    <div className={styles.wrapper_percent_text}>
                                        <div className={styles.full_text}>
                                            100<div className={styles.percent}>%</div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {isMobileOnly && (
                                <>
                                    <div className={styles.wrapper_percent_text}>
                                        <div className={styles.full_text}>
                                            100<div className={styles.percent}>%</div>
                                        </div>
                                    </div>
                                    <div className={styles.img_text}>оплата</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsFullPayment;
