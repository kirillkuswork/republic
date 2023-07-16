import React, { useEffect } from 'react';
import styles from './Accordion.module.scss';
import SvgIcons from '../../svgs/SvgIcons';
import AnimatedIconButton from '../buttons/animated-icon-button/AnimatedIconButton';

export interface IAccordion {
    iconId: string;
    text: string;
    description: string;
    activeAccordion?: boolean;
}

const Accordion: React.FC<IAccordion> = ({ iconId, text, description, activeAccordion }) => {
    const [isOpened, setIsopened] = React.useState<boolean>(false);
    const toggleAccordion = () => {
        if (activeAccordion === undefined) {
            setIsopened(!isOpened);
        }
    };

    useEffect(() => {
        if (activeAccordion === true) {
            setIsopened(true);
        } else if (activeAccordion === false) {
            setIsopened(false);
        }
    });

    const [isButtonActive, setIsButtonActive] = React.useState(false);

    return (
        <>
            <div
                className={styles.item}
                onClick={toggleAccordion}
                onMouseEnter={() => {
                    setIsButtonActive(true);
                }}
                onMouseLeave={() => {
                    setIsButtonActive(false);
                }}
            >
                <div className={styles.itemIcon}>
                    <SvgIcons id={iconId} />
                </div>
                <div className={styles.itemRightSide}>
                    <div className={isOpened ? styles.itemTextActive : styles.itemText} dangerouslySetInnerHTML={{ __html: text }} />
                    <div className={styles.openBtn}>
                        <AnimatedIconButton
                            type={'button'}
                            variant={'round'}
                            outline={true}
                            color={'brick'}
                            direction='down'
                            //@ts-ignore
                            isActive={isButtonActive}
                            className={`${styles.button} ${!isOpened && styles.button_active}`}
                        >
                            <SvgIcons id={'close'} />
                        </AnimatedIconButton>
                    </div>
                </div>
            </div>
            {isOpened && <div dangerouslySetInnerHTML={{ __html: description }} className={styles.itemDescription} />}
        </>
    );
};

export default Accordion;
