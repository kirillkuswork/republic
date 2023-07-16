import React, { useMemo } from 'react';
import styles from './TermsMortgage.module.scss';
import Tooltip from '../../../../../features/tooltip/Tooltip';
import SvgIcons from '../../../../../svgs/SvgIcons';
import { IApiCatalog, IApiCatalogFlat, IApiTerms, IApiTermsCalcData } from '../../../../../../store/api/apiTypes';
import { useAppSelector } from '../../../../../../hook';
import Calculator from '../../calculator/Calculator';
import { isMobileOnly } from 'react-device-detect';
import Slider from '../../../../slider/Slider';
import CardContent from '../../card-content/CardContent';
import SliderHand from '../../../../../shared/slider-hand/SliderHand';

interface ITermsMortgage {
    specialMortgages: IApiTerms;
    calcData: IApiTermsCalcData[];
    allFlats: IApiCatalogFlat[];
}

const TermsMortgage: React.FC<ITermsMortgage> = ({ specialMortgages, calcData, allFlats }) => {
    const special_tooltip = useAppSelector((state) => state.termsPage.special_tooltip);
    const comfort_tooltip = useAppSelector((state) => state.termsPage.comfort_tooltip);
    const comfort_mortgage = useAppSelector((state) => state.termsPage.comfort_mortgage);
    const getMinRateMortgage = useMemo(() => {
        const filteredMortgages = calcData.filter((f) => f.mortgage_type.mortgage_type_name === 'Стандартная');
        return filteredMortgages.reduce((prev, cur) =>
            Number(cur.mortgage_rate.replace(',', '.')) < Number(prev.mortgage_rate.replace(',', '.')) ? cur : prev,
        );
    }, [calcData]);

    return (
        <>
            <section className={styles.section_container}>
                <div className={styles.section_header}>
                    <h4 className={styles.h4}>Специальные программы</h4>
                    <Tooltip
                        behavior='hover'
                        content={special_tooltip}
                        theme='base'
                        placement={isMobileOnly ? 'bottom' : 'right'}
                        size={!isMobileOnly ? 400 : undefined}
                    >
                        <SvgIcons id='info' theme={'dark-grey'} />
                    </Tooltip>
                </div>
                <div className={styles.card_container}>
                    {specialMortgages.description.map((mortgage, i, row) => {
                        return <CardContent type={'mortgage'} title={mortgage.title} desc={mortgage.item} key={i} />;
                    })}
                </div>
            </section>
            <section className={styles.section_container_dinamic}>
                <div className={styles.section_header}>
                    <h4 className={styles.h4}>Комфортная ипотека</h4>
                    <Tooltip
                        behavior='hover'
                        content={comfort_tooltip}
                        theme='base'
                        placement={isMobileOnly ? 'bottom' : 'right'}
                        size={!isMobileOnly ? 500 : undefined}
                    >
                        <SvgIcons id='info' theme={'dark-grey'} />
                    </Tooltip>
                </div>
                {!isMobileOnly && (
                    <div className={styles.card_container__wrap}>
                        {comfort_mortgage.map((mortgage, i, row) => {
                            return (
                                <CardContent
                                    type={'comfort_mortgage'}
                                    title={mortgage.title}
                                    desc={mortgage.desc}
                                    rate={getMinRateMortgage.mortgage_rate}
                                    icon={mortgage.icon.src}
                                    id={mortgage.id}
                                    key={i}
                                />
                            );
                        })}
                    </div>
                )}
                {isMobileOnly && (
                    <>
                        <SliderHand position={'right'} />
                        <Slider size={'content'} arrow={false}>
                            {comfort_mortgage.map((mortgage, i, row) => {
                                return (
                                    <CardContent
                                        type={'comfort_mortgage'}
                                        title={mortgage.title}
                                        desc={mortgage.desc}
                                        rate={getMinRateMortgage.mortgage_rate}
                                        icon={mortgage.icon.src}
                                        id={mortgage.id}
                                        key={i}
                                    />
                                );
                            })}
                        </Slider>
                    </>
                )}
            </section>
            <Calculator calcData={calcData} allFlats={allFlats} />
        </>
    );
};

export default TermsMortgage;
