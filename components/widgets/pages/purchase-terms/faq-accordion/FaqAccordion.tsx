import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import styles from './FaqAccordion.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import { IApiTermsQA } from '../../../../../store/api/apiTypes';
import CheckboxButton from '../../../../features/buttons/checkbox-button/CheckboxButton';
import { isMobileOnly } from 'react-device-detect';
import Slider from '../../../slider/Slider';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';

interface IFaqAccordion {
    qa: IApiTermsQA[];
}

const FaqAccordion: React.FC<IFaqAccordion> = ({ qa }) => {
    const [activeTab, setActiveTab] = useState(qa[0].qa_category.qa_category_name);
    const [open, setOpen] = useState<{ [key: string]: boolean | undefined }>({});

    const dataQa = useMemo(() => {
        return qa.reduce((result: { [key: string]: IApiTermsQA[] }, current, index) => {
            const cat_name = current.qa_category.qa_category_name;
            if (!(cat_name in result)) result[cat_name] = [];
            result[cat_name].push(current);
            return result;
        }, {});
    }, [qa]);

    const buttonIds = useMemo(() => {
        return qa.map((faq) => {
            return { [faq._id]: false };
        });
    }, [qa]);

    const [isButtonActive, setIsButtonActive] = useState(buttonIds);

    const handleClick = (e: MouseEvent<HTMLElement>, id: string) => {
        e.preventDefault();
        setOpen({
            [id]: open[id] ? undefined : true,
        });
    };

    useEffect(() => setOpen({}), [activeTab]);

    return (
        <>
            <section className={styles.section_container}>
                <div className={styles.section_header}>
                    <h3 className={styles.h3}>Вопрос-ответ</h3>
                </div>
                <div className={styles.qa_block}>
                    {isMobileOnly && (
                        <div className={styles.tab_qa_slider}>
                            <Slider size={'content'} arrow={false}>
                                {Object.keys(dataQa).map((cat_name, index) => {
                                    return (
                                        <CheckboxButton
                                            key={index}
                                            disabled={false}
                                            theme='outline-dark-grey'
                                            name={cat_name}
                                            value={cat_name}
                                            disabledText=''
                                            id='qa_tab'
                                            size='mini'
                                            active={activeTab === cat_name}
                                            checkboxWithIcon={false}
                                            selectParameter={() => setActiveTab(cat_name)}
                                            style={{ height: 40.3, width: index === 0 ? 250 : 'auto' }}
                                        />
                                    );
                                })}
                            </Slider>
                        </div>
                    )}
                    {!isMobileOnly && (
                        <aside className={styles.tab_qa}>
                            {Object.keys(dataQa).map((cat_name, index) => {
                                return (
                                    <CheckboxButton
                                        key={index}
                                        disabled={false}
                                        theme='outline-dark-grey'
                                        name={cat_name}
                                        value={cat_name}
                                        disabledText=''
                                        id='qa_tab'
                                        size='mini'
                                        active={activeTab === cat_name}
                                        checkboxWithIcon={false}
                                        selectParameter={() => setActiveTab(cat_name)}
                                    />
                                );
                            })}
                        </aside>
                    )}
                    <div className={styles.qa_question}>
                        {dataQa[activeTab].map((data, i, row) => {
                            return (
                                <details className={styles.accordion_details} key={data._id} id={data._id} open={open[data._id]}>
                                    <summary
                                        className={styles.accordion_title}
                                        onClick={(e) => {
                                            handleClick(e, data._id);
                                        }}
                                        onMouseEnter={() => {
                                            setIsButtonActive({ ...isButtonActive, [data._id]: true });
                                        }}
                                        onMouseLeave={() => {
                                            setIsButtonActive({ ...isButtonActive, [data._id]: false });
                                        }}
                                    >
                                        <div className={styles.accordion_title_text}>{data.name}</div>
                                        <div className={styles.accordion_brn}>
                                            <AnimatedIconButton
                                                type={'button'}
                                                variant={'round'}
                                                outline={true}
                                                color={'brick'}
                                                direction='down'
                                                //@ts-ignore
                                                isActive={isButtonActive[data._id]}
                                                className={`${styles.button} ${!open[data._id] && styles.button_active}`}
                                            >
                                                <SvgIcons id={'close'} />
                                            </AnimatedIconButton>
                                        </div>
                                    </summary>
                                    <p
                                        className={styles.accordion_answer}
                                        dangerouslySetInnerHTML={{ __html: data.qa_html_answer.replaceAll('&amp;nbsp;', '\u00A0') }}
                                    ></p>
                                </details>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FaqAccordion;
