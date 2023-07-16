import React from 'react';
import styles from './AccordionQa.module.scss';
import AnimatedIconButton from '../buttons/animated-icon-button/AnimatedIconButton';
import SvgIcons from '../../svgs/SvgIcons';

export interface IAccordionQa {
    accordionItem: { title: string; item: string };
    activeAccordion?: boolean;
    handleAccordion?: (index: number | undefined) => void;
    index?: number | undefined;
}

const AccordionQa: React.FC<IAccordionQa> = ({ accordionItem, activeAccordion, handleAccordion, index }) => {
    const [isOpened, setIsopened] = React.useState<boolean>(false);
    const toggleAccordion = () => {
        if (activeAccordion === undefined) {
            setIsopened(!isOpened);
        }
        if (handleAccordion) {
            handleAccordion(index);
        }
    };

    React.useEffect(() => {
        if (activeAccordion === true) {
            setIsopened(true);
        } else if (activeAccordion === false) {
            setIsopened(false);
        }
    });

    const [isButtonActive, setIsButtonActive] = React.useState(false);

    return (
        <div className={styles.qa_question}>
            <div className={isOpened ? `${styles.accordion_details} ${styles.accordion_details_active}` : styles.accordion_details}>
                <div
                    className={styles.accordion_title}
                    onClick={toggleAccordion}
                    onMouseEnter={() => {
                        setIsButtonActive(true);
                    }}
                    onMouseLeave={() => {
                        setIsButtonActive(false);
                    }}
                >
                    <div className={styles.accordion_title_text} dangerouslySetInnerHTML={{ __html: accordionItem.title }} />
                    <div className={styles.accordion_btn}>
                        <AnimatedIconButton
                            type={'button'}
                            variant={'round'}
                            outline={true}
                            color={'brick'}
                            direction='down'
                            isActive={isButtonActive}
                            className={`${styles.button} ${isOpened && styles.button_active}`}
                        >
                            <SvgIcons id={'close'} />
                        </AnimatedIconButton>
                    </div>
                </div>
                <div className={styles.accordion_answer}>
                    <div className={styles.accordion_answer_text} dangerouslySetInnerHTML={{ __html: accordionItem.item }} />
                </div>
            </div>
        </div>
    );
};

export default AccordionQa;
