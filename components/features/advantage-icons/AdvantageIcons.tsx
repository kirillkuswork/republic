import React, { useEffect, useRef, useState } from 'react';
import styles from './AdvantageIcons.module.scss';
import { IApiCatalogFlat } from '../../../store/api/apiTypes';
import { useAppSelector } from '../../../hook';
import Tooltip from '../tooltip/Tooltip';
import SvgIcons from '../../svgs/SvgIcons';
import { advantagesType } from '../../../models';
import { separateArray } from '../../../tools/separateArray';

export interface IAdvantageIcons {
    flat: IApiCatalogFlat;
    theme: 'white' | 'light' | 'darker-light' | 'grey' | 'dark-grey' | 'brick' | 'brick-light';
    short: boolean;
    amount?: number;
    direction?: 'left' | 'right' | 'details';
}

const AdvantageIconsComponent: React.FC<IAdvantageIcons> = ({ flat, theme, short, amount, direction }) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const advantages = useAppSelector((state) => state.catalogPage.filterParameters.byCheckbox.advantages);
    const advantagesSvgIcons = useAppSelector((state) => state.catalogPage.filterParameters.advantagesSvgIcons);
    const [currentAdvantages, setCurrentAdvantages] = useState<advantagesType[]>();
    const [show, setShow] = useState(false);

    //Получение списка активных характеристик у квартиры
    let activeAttributes = Object.entries(flat.attributes)
        .filter((item) => item.includes(true))
        .map((item) => item.slice(0, 1).toString());

    //Получение данных об актуальных характеристик из хранилища (кроме отделки)
    let activeAdvantages = advantages.filter((advantage) => activeAttributes.includes(advantage.value));

    useEffect(() => {
        //выбор только тех характеристик, под которые загружены иконки
        setCurrentAdvantages(activeAdvantages.filter((advantage) => advantagesSvgIcons.includes(advantage.value)));
    }, [flat]);

    const handleOutsideClick = ({ target }: MouseEvent) => {
        if (targetRef.current) {
            if (targetRef.current.contains(target as Node)) {
                return;
            }

            setShow(false);
        }
    };

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!show) {
            document.addEventListener('click', (event) => handleOutsideClick(event), false);
        } else {
            document.removeEventListener('click', (event) => handleOutsideClick(event), false);
        }

        setShow(!show);
    };

    if (currentAdvantages)
        return (
            <div className={styles.btn}>
                {short && amount ? (
                    <>
                        <div className={styles.btn__wrapp}>
                            {separateArray(currentAdvantages, amount)?.visible?.map((item) => {
                                return (
                                    <Tooltip behavior={'hover'} content={item?.name} theme={'base'} key={item?.value}>
                                        <SvgIcons id={item?.value} theme={theme} />
                                    </Tooltip>
                                );
                            })}
                        </div>
                        {separateArray(activeAdvantages, amount)?.unvisible?.length !== 0 && (
                            <div className={styles.btn__advantages}>
                                <button
                                    ref={targetRef}
                                    className={`${styles.btn__special__unvisible} ${styles[theme]}`}
                                    onClick={(event) => handleClick(event)}
                                    onMouseEnter={() => setShow(true)}
                                    onMouseLeave={() => setShow(false)}
                                >{`+${separateArray(activeAdvantages, amount)?.unvisible?.length}`}</button>
                                <div
                                    className={`${styles.btn__hideAdv} ${show ? styles.show : styles.hide} ${
                                        styles[direction ? direction : '']
                                    }`}
                                >
                                    {separateArray(activeAdvantages, amount)?.unvisible?.map((el, i) => {
                                        return <div key={el.name + i}> {el.name} </div>;
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.btn__wrapp}>
                        {currentAdvantages.map((item) => {
                            return (
                                <Tooltip behavior={'hover'} content={item?.name} theme={'base'} key={item?.value}>
                                    <SvgIcons id={item?.value} theme={theme} />
                                </Tooltip>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    return null;
};

export const AdvantageIcons = React.memo(AdvantageIconsComponent);
