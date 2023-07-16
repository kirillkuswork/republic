import React, { RefCallback, useCallback, useEffect, useRef, useState } from 'react';
import styles from './FloorComponent.module.scss';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import { setCurrentBulkId, setCurrentFlat, setCurrentFloor } from '../../../../../store/slices/catalog/catalogSlice';
import Image from 'next/image';
import { getActiveFlatsOnTheFloor, getAllFlats, getCurrentFlatInfo } from '../../../../../store/slices/selectors';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { fetchCatalog } from '../../../../../store/api/api';
import Hint from '../../../../features/hint/Hint';
import { setHintContainer, setHintElement, setHintIsShow } from '../../../../../store/slices/components/componentsSlice';
import editRoomsLabel from '../../../../../tools/edit-rooms-label';
import RedPrice from '../../../../shared/red-price/RedPrice';
import Price from '../../../../shared/price/Price';
import ROUTES from '../../../../../constants/routes';
import MiniMap from '../../../../svgs/MiniMap/MiniMap';
import Compass from '../../../../shared/compass/Compass';
import { isMobile } from 'react-device-detect';

export interface IFloorComponent {}

const FloorComponent: React.FC<IFloorComponent> = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    isMobile ? router.push(ROUTES.list) : null;

    const floorId = router.query.floorId;
    const houseId = router.query.houseId;
    const svgRef = useRef<SVGElement>(null);
    const flats = useAppSelector(getAllFlats);
    const activeFlatsOnTheFloor = useAppSelector(getActiveFlatsOnTheFloor);
    const currentFlatInfo = useAppSelector(getCurrentFlatInfo);
    const [numbers, setNumbers] = useState<{ number: number; active: boolean }[]>([]);
    const [imageOnload, setImageOnload] = useState(false);

    useEffect(() => {
        //Запрос каталога в случае, если в слайсе нет данных о квартирах
        if (flats.length === 0) {
            dispatch(fetchCatalog());
        }
    }, [dispatch, flats.length]);

    useEffect(() => {
        dispatch(setHintIsShow(false));
        return () => {
            dispatch(setHintIsShow(false));
        };
    }, []);

    useEffect(() => {
        if (houseId && floorId) {
            dispatch(setCurrentBulkId(+houseId));
            dispatch(setCurrentFloor(+floorId));
        }
    }, [houseId, floorId]);

    useEffect(() => {
        beforeSvgInjection();
        beforeSvgInjectionSection();
    }, [activeFlatsOnTheFloor, currentFlatInfo]);

    const beforeSvgInjection = () => {
        const svg = document.getElementById('flats');
        if (!svg) return;

        // //Получаем список элементов домов
        let flats = [...Array.from(svg.children)] as Element[];
        setNumbers([]);

        const activeFlats = activeFlatsOnTheFloor.map((item) => item.number);

        flats.forEach((item) => {
            let numberFlat = item.id.replace('fl', '');
            //Добавляем доступным для бронирования квартирам активный класс,
            //а недоступным для бронирования - неактивный
            //собираем номера квартир в массив для лейблов
            if (activeFlats.includes(numberFlat)) {
                item.classList.add(styles.current);
                setNumbers((prevNumbers) => [
                    ...prevNumbers,
                    {
                        number: +numberFlat,
                        active: true,
                    },
                ]);
            } else {
                setNumbers((prevNumbers) => [
                    ...prevNumbers,
                    {
                        number: +numberFlat,
                        active: false,
                    },
                ]);
                item.classList.add(styles.disabled);
            }

            setTimeout(() => {
                //Ищем текущий лейбл квартиры
                let label = document.querySelector<HTMLElement>('[data-number=data-' + numberFlat + ']');
                //Ищем текущую квартиру
                const flat = flats.find((item) => item.id === `fl${numberFlat}`);

                if (!flat) return;
                if (!label) return;

                //Вычисляем координаты местонахождения области текущей квартиры
                const { left: targetLeft, top: targetTop, width: targetWidth, height: targetHeight } = flat.getBoundingClientRect();
                //Располагаем лейбл посередине области текущей квартиры
                if (label) {
                    label.style.left = `${targetLeft + targetWidth / 2}px`;
                    label.style.top = `${window.scrollY + targetTop + targetHeight / 2}px`;

                    item.addEventListener('mouseenter', () => {
                        label?.classList.add(styles.current_label);
                    });

                    item.addEventListener('mouseleave', () => {
                        label?.classList.remove(styles.current_label);
                    });
                }
            }, 100);

            item.addEventListener('mouseenter', () => {
                dispatch(setHintElement(item));
                dispatch(setHintIsShow(true));
                dispatch(setCurrentFlat(+numberFlat));
            });

            item?.addEventListener('mouseleave', () => {
                dispatch(setHintIsShow(false));
            });

            item.addEventListener('click', () => {
                if (!currentFlatInfo) return;
                router.push(`${ROUTES.visual.root}/${houseId}/${floorId}/${currentFlatInfo.id}`);
            });
        });
    };

    const beforeSvgInjectionSection = useCallback(() => {
        if (activeFlatsOnTheFloor.length !== 0) {
            const svg = document.getElementById(`${houseId}_${activeFlatsOnTheFloor[0].floor}`);
            if (!svg) return;
            svg.classList.add(styles.currentFloor);
        }
    }, [activeFlatsOnTheFloor]);

    const hintContainerRef: RefCallback<HTMLElement | null> = useCallback((node: HTMLElement | null) => {
        if (node) {
            dispatch(setHintContainer(node));
        }
    }, []);

    if (houseId && floorId && activeFlatsOnTheFloor.length !== 0)
        return (
            <>
                <div className={styles.container} ref={hintContainerRef}>
                    <div className={styles.grid}>
                        <div className={styles.floor}>
                            <div className={styles.floor__block}>
                                <h1 className={styles.title}>{floorId} этаж</h1>
                                <div className={styles.scheme__container}>
                                    <Image
                                        src={`/plans/${houseId}/floors/png/fl${floorId}.png`}
                                        alt={`Планировка этажа №${floorId}`}
                                        fill={true}
                                        className={styles.image}
                                        sizes={'60vw'}
                                        onLoad={() => setImageOnload(true)}
                                    />
                                    {imageOnload && (
                                        <SVG
                                            src={`/plans/${houseId}/floors/svg/fl${floorId}.svg`}
                                            className={styles.scheme}
                                            onLoad={() => beforeSvgInjection()}
                                            id={'plan'}
                                            innerRef={svgRef}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.houses}>
                            <div className={styles.houses__block}>
                                <span className={styles.houses__name}>{activeFlatsOnTheFloor[0].houseName}</span>
                                <div className={styles.houses__scheme}>
                                    <MiniMap
                                        houseName={`${
                                            activeFlatsOnTheFloor[0].houseName.toLowerCase() === ('reds' || 'whites')
                                                ? `${
                                                      activeFlatsOnTheFloor[0].houseName.toLowerCase() +
                                                      activeFlatsOnTheFloor[0].section.number
                                                  }`
                                                : activeFlatsOnTheFloor[0].houseName.toLowerCase()
                                        }`}
                                        theme={'light'}
                                        setActiveHouse={() => {}}
                                    />
                                    <span className={`${styles.span} ${styles.houses__text}`}>ул. пресненский вал</span>
                                </div>
                                <span className={styles.compass}>
                                    <Compass />
                                </span>
                            </div>
                        </div>
                        <div className={styles.house}>
                            <div className={styles.house_block}>
                                <SVG
                                    src={`/plans/${activeFlatsOnTheFloor[0].houseName.toLowerCase()}-simple-scheme.svg`}
                                    className={styles.scheme__mini}
                                    onLoad={() => beforeSvgInjectionSection()}
                                    id={'plan_mini'}
                                />
                            </div>
                            <span className={styles.sectionNumber}>Секция {activeFlatsOnTheFloor[0].section.number}</span>
                        </div>
                    </div>
                </div>
                {numbers && imageOnload && (
                    <>
                        {numbers.map((label) => {
                            return (
                                <div
                                    className={`${styles.label} ${styles[label.active ? 'active' : 'no_active']}`}
                                    data-number={`data-${label.number}`}
                                    key={`key-${label.number}`}
                                >
                                    <span>{label.number}</span>
                                </div>
                            );
                        })}
                    </>
                )}
                {currentFlatInfo && (
                    <Hint orientation={'right'}>
                        <>
                            <div className={styles.number}>
                                <span>{currentFlatInfo.number}</span>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.header}>
                                    <div className={styles.element}>
                                        <span>Спальни</span>
                                        <span>{editRoomsLabel(currentFlatInfo).rooms}</span>
                                    </div>
                                    <div className={styles.element}>
                                        <span>Площадь</span>
                                        <span>
                                            {currentFlatInfo.area}м<sup>2</sup>
                                        </span>
                                    </div>
                                </div>
                                {currentFlatInfo.redPrice ? (
                                    <RedPrice flat={currentFlatInfo} tooltip={true} tooltipTheme={'base'} size={'h5'} />
                                ) : (
                                    <Price flat={currentFlatInfo} size={'h5'} />
                                )}
                            </div>
                        </>
                    </Hint>
                )}
            </>
        );
    return <></>;
};

export default FloorComponent;
