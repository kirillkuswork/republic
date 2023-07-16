import React, { useEffect } from 'react';
import styles from './TermsTradeIn.module.scss';
import { fetchTradeinPrograms } from '../../../../../../store/api/api';
import { useAppDispatch, useAppSelector } from '../../../../../../hook';
import { isMobileOnly } from 'react-device-detect';
import Slider from '../../../../slider/Slider';
import CardContent from '../../card-content/CardContent';
import SliderHand from '../../../../../shared/slider-hand/SliderHand';
import AccordionQa from '../../../../../features/accordion-qa/AccordionQa';
import AnimatedSimpleButton from '../../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { openModal } from '../../../../../../store/slices/callOrder/callOrderSlice';

interface ITermsTradeIn {}

const TermsTradeIn: React.FC<ITermsTradeIn> = ({}) => {
    const tradein_steps = useAppSelector((state) => state.termsPage.tradein_steps);
    const tradein_advantages = useAppSelector((state) => state.termsPage.tradein_advantages);
    const tradeInPrograms = useAppSelector((state) => state.termsPage.tradeInPrograms);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTradeinPrograms());
    }, [dispatch]);
    const [activeAccordion, setActiveAccordion] = React.useState<number>();

    const handleAccordion = (index: number | undefined) => {
        activeAccordion === index ? setActiveAccordion(undefined) : setActiveAccordion(index);
    };

    const handleBtnClick = () => {
        dispatch(openModal('tradeinForm | Нужна консультация по трейд-ин'));
    };

    return (
        <div className={styles.tradein_container}>
            <div className={styles.section_container}>
                <div className={styles.title}>Трейд-ин</div>
                <div className={styles.text}>
                    Трейд-ин&nbsp;&mdash; это возможность выгодно обменять имеющуюся у&nbsp;Вас недвижимость на&nbsp;квартиру премиум-класса
                    в&nbsp;проекте Republic. Сделать это просто:
                </div>
                {!isMobileOnly && (
                    <div className={styles.requestBtn}>
                        <AnimatedSimpleButton
                            text='Оставить заявку'
                            theme='brick-filled'
                            onClick={handleBtnClick}
                            withIcon
                            // iconAnimation={'right'}
                            // iconPosition={'right'}
                            size={'default'}
                            width='fit-content'
                        >
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </div>
                )}
            </div>
            {!isMobileOnly && (
                <div className={styles.card_container__wrap}>
                    {tradein_steps.map((step, i) => {
                        return (
                            <CardContent
                                type={'trade_in_dekstop'}
                                title={step.title}
                                id={step.id}
                                key={i}
                                btnName={step.btnName}
                                btnLink={step.btnLink}
                            />
                        );
                    })}
                </div>
            )}
            {isMobileOnly && (
                <>
                    <SliderHand position={'right'} />
                    <Slider size={'content'} arrow={false}>
                        {tradein_steps.map((step, i) => {
                            return (
                                <CardContent
                                    type={'trade_in'}
                                    title={step.title}
                                    id={step.id}
                                    key={i}
                                    btnName={step.btnName}
                                    btnLink={step.btnLink}
                                />
                            );
                        })}
                    </Slider>
                    <div className={styles.requestBtnMobile}>
                        <AnimatedSimpleButton
                            text='Оставить заявку'
                            theme='brick-filled'
                            onClick={handleBtnClick}
                            withIcon
                            // iconAnimation={'right'}
                            // iconPosition={'right'}
                            size={'default'}
                            width='100%'
                        >
                            <SvgIcons id='arrow right' />
                        </AnimatedSimpleButton>
                    </div>
                </>
            )}
            <div className={styles.section_container}>
                <div className={styles.section_header}>
                    <div className={styles.h4}>Ваши преимущества</div>
                </div>
            </div>
            <div className={styles.card_container__wrap}>
                {tradein_advantages.map((advantage, i) => {
                    return (
                        <CardContent
                            type={'transparent_cards'}
                            title={advantage.title}
                            desc={advantage.desc}
                            id={advantage.id}
                            key={i}
                            icon={advantage.icon?.src}
                        />
                    );
                })}
            </div>
            <div className={styles.section_container}>
                <div className={styles.section_header}>
                    <div className={styles.h4}>ПРОГРАММЫ ТРЕЙД-ИН</div>
                </div>
            </div>
            <div className={styles.section_list}>
                {tradeInPrograms.map((program, index) => (
                    <div key={index}>
                        <AccordionQa
                            accordionItem={program}
                            activeAccordion={activeAccordion === index}
                            handleAccordion={handleAccordion}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TermsTradeIn;
