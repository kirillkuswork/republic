import React, { useState, useEffect } from 'react';
import styles from './HousePageIconList.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import Accordion from '../../../../features/accordion/Accordion';

export interface HousePageIconList {
    iconList: any;
}

const IconList: React.FC<HousePageIconList> = ({ iconList }) => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>();

	const handleClick = (index: number) => {
		if (activeAccordion === index) {
			setActiveAccordion(null)
		} else setActiveAccordion(index)
	}

    return (
        <>
            <div className={styles.iconList}>
                <div className={styles.iconListTitle}>современные технологии</div>
                <ul>
                    {iconList.map((item: any, index: number) => (
						<li key={index} onClick={() => handleClick(index)}>
                            <Accordion
                                iconId={item.iconId}
                                text={item.text}
                                description={item.description}
                                activeAccordion={activeAccordion === index}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default IconList;
