import React, { useCallback, useState } from 'react';
import SVG from 'react-inlinesvg';
import styles from './FlatSchemes.module.scss';
import { IApiCatalogFlat } from '../../../../../store/api/apiTypes';
import MiniMap from '../../../../svgs/MiniMap/MiniMap';
import Compass from '../../../../shared/compass/Compass';
import SvgIcons from '../../../../svgs/SvgIcons';
import AnimatedSimpleButton from '../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

export interface IFlatSchemes {
    flat: IApiCatalogFlat;
}

const FlatSchemes: React.FC<IFlatSchemes> = ({ flat }) => {
    const [planType, setPlanType] = useState<'furnished' | 'sized'>('furnished');
    //Функция, которая вызывается после отрисовки SVG
    const beforeSvgInjection = useCallback(() => {
        if (document.getElementById(`floor`)) {
            //Закрашивание этажа
            let floor = document.getElementById(`floor`);
            if (!floor) return;
            const flats = [...Array.from(floor.children)];
            let currentFlat = flats?.find((item) => item.id === `_${flat.number}`);
            if (!currentFlat) return;
            currentFlat.classList.add(styles.current);
        }
    }, [flat]);

    const choosePlanFurnishedType = () => {
        setPlanType('furnished');
    };

    const choosePlanSizedType = () => {
        setPlanType('sized');
    };

    return (
        <div className={styles.container}>
            <div className={styles.flat}>
                <div className={styles.flat__block}>
                    {planType === 'furnished' ? (
                        <SVG src={`/plans/${flat.bulk_id}/flats/furnished-plan/${flat.number}.svg`} className={styles.flat__scheme} />
                    ) : (
                        <SVG src={`/plans/${flat.bulk_id}/flats/sized-plan/${flat.number}.svg`} className={styles.flat__scheme} />
                    )}
                    <span className={`${styles.span} ${styles.flat__bottom}`}>ул. пресненский вал</span>
                </div>
                {flat.houseName.toLowerCase() === 'reds' && (
                    <div className={styles.flat__buttons}>
                        <div className={planType === 'furnished' ? styles.active : ''}>
                            <AnimatedSimpleButton
                                text={'С мебелью'}
                                theme={'dark-outline'}
                                onClick={() => choosePlanFurnishedType()}
                                size={'mini'}
                            />
                        </div>
                        <div className={planType === 'sized' ? styles.active : ''}>
                            <AnimatedSimpleButton
                                text={'габаритные размеры'}
                                theme={'dark-outline'}
                                onClick={() => choosePlanSizedType()}
                                size={'mini'}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.houses}>
                <div className={styles.houses__block}>
                    <span className={styles.houses__name}>{flat.houseName}</span>
                    <div className={styles.houses__scheme}>
                        <MiniMap
                            houseName={`${
                                flat.houseName.toLowerCase() === ('reds' || 'whites')
                                    ? `${flat.houseName.toLowerCase() + flat.section.number}`
                                    : flat.houseName.toLowerCase()
                            }`}
                            theme={'light'}
                            setActiveHouse={() => {}}
                        />
                        <span className={`${styles.span} ${styles.houses__text}`}>ул. пресненский вал</span>
                    </div>
                </div>
            </div>
            <div className={styles.floor}>
                <div className={styles.floor__button}>
                    <AnimatedSimpleButton
                        text={'Вид из окон'}
                        size={'mini'}
                        theme={`dark-outline`}
                        withIcon={true}
                        iconPosition={'right'}
                        iconAnimation={'down'}
                        iconPermanentColor={'dark-grey'}
                        disableIconBg={true}
                        link={'https://republic-forma.netlify.app/'}
                    >
                        <SvgIcons id={'eye'} />
                    </AnimatedSimpleButton>
                </div>
                <span className={styles.compass}>
                    <Compass rotate={true} />
                </span>
                <div className={styles.floor__block}>
                    <SVG
                        src={`/plans/${flat.bulk_id}/simple-floor-schemes/${flat.floor}.svg`}
                        className={styles.floor__scheme}
                        onLoad={() => {
                            beforeSvgInjection();
                        }}
                        id={'floor'}
                    />
                    <span className={`${styles.span} ${styles.floor__span}`}>ул. пресненский вал</span>
                </div>
            </div>
        </div>
    );
};

export default FlatSchemes;
