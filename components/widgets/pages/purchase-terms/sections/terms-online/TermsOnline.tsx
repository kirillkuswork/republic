import React, { useState } from 'react';
import styles from './TermsOnline.module.scss';
import { IApiTermsQA } from '../../../../../../store/api/apiTypes';
import { useAppSelector } from '../../../../../../hook';
import Slider from '../../../../slider/Slider';
import FaqAccordion from '../../faq-accordion/FaqAccordion';
import CardContent from '../../card-content/CardContent';
import SliderHand from '../../../../../shared/slider-hand/SliderHand';
interface ITermsOnline {
    qa: IApiTermsQA[];
}

const TermsOnline: React.FC<ITermsOnline> = ({ qa }) => {
    const online_cards = useAppSelector((state) => state.termsPage.online_cards);
    return (
        <>
            <section className={styles.section_container}>
                <SliderHand position={'right'} />
                <Slider size={'content'} arrow={false}>
                    {online_cards.map((online, i, row) => {
                        return (
                            <CardContent
                                type={'online'}
                                title={online.title}
                                desc={online.desc}
                                details_desc={online.details_desc}
                                button={online.button}
                                type_button={online.type_button}
                                id={online.id}
                                key={i}
                            />
                        );
                    })}
                </Slider>
            </section>
            <FaqAccordion qa={qa} />
        </>
    );
};

export default TermsOnline;
