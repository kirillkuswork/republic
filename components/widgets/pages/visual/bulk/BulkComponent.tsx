import styles from './BulkComponent.module.scss';
import { useRouter } from 'next/router';
import React, { RefCallback, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { setCurrentBulkId, setCurrentBulk } from '../../../../../store/slices/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import {
    getAllFlats,
    getBulks,
    getCurrentBulk,
    getCurrentFloor,
    getCurrentHouseNameFlats,
    getFlatsOnActiveFloor,
} from '../../../../../store/slices/selectors';
import DeadlineMessage from '../../../../shared/deadline-message/DeadlineMessage';
import changeEnding from '../../../../../tools/change-ending';
import FlatLabel from '../flat-label/FlatLabel';
import MiniMap from '../../../../svgs/MiniMap/MiniMap';
import SoloBulkSvg from './solo-bulk-svg/SoloBulkSvg';
import DoubleBulkSvg from './double-bulk-svg/DoubleBulkSvg';
import { fetchCatalog } from '../../../../../store/api/api';
import Hint from '../../../../features/hint/Hint';
import { setHintContainer, setHintIsShow } from '../../../../../store/slices/components/componentsSlice';
import Compass from '../../../../shared/compass/Compass';
import { isMobile } from 'react-device-detect';
import ROUTES from '../../../../../constants/routes';
import { IApiBulk } from '../../../../../store/api/apiTypes';
import getQuarter from '../../../../../tools/get-quarter';

const BulkComponent = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    isMobile ? router.push(ROUTES.list) : null;

    const bulkId = router.query.houseId;
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const bulks = useAppSelector(getBulks);
    const [bulkIds, setBulkIds] = useState<{ id: number; name: string }[]>([]);
    const [currentBulks, setCurrentBulks] = useState<IApiBulk[]>([]);
    const [widthSvgContainer, setWidthSvgContainer] = useState(0);
    const flats = useAppSelector(getAllFlats);
    const currentBulk = useAppSelector(getCurrentBulk);
    const currentBulkFlats = useAppSelector(getCurrentHouseNameFlats);
    const currentFloor = useAppSelector(getCurrentFloor);
    const flatsOnActiveFloor = useAppSelector(getFlatsOnActiveFloor);

    const hintContainerRef: RefCallback<HTMLElement | null> = useCallback((node: HTMLElement | null) => {
        if (node) {
            dispatch(setHintContainer(node));
        }
    }, []);

    useEffect(() => {
        dispatch(setHintIsShow(false));
        return () => {
            dispatch(setHintIsShow(false));
        };
    }, []);

    useEffect(() => {
        setBulkIds(
            bulks
                .filter((item) => item.houseName.toLowerCase() === currentBulk?.houseName.toLowerCase())
                .map((item) => {
                    return { id: item.id, name: item.name.slice(-1) };
                })
                .reverse(),
        );
        setCurrentBulks(bulks.filter((item) => item.houseName.toLowerCase() === currentBulk?.houseName.toLowerCase()));
    }, [currentBulk]);

    useEffect(() => {
        //Запрос каталога в случае, если в слайсе нет данных о квартирах
        if (flats.length === 0) {
            dispatch(fetchCatalog());
        }
    }, [dispatch, flats.length]);

    useMemo(() => {
        if (bulkId) {
            dispatch(setCurrentBulkId(+bulkId));
        }
    }, [bulkId]);

    useMemo(() => {
        if (currentBulk) {
            dispatch(setCurrentBulk(currentBulk.houseName.toLowerCase()));
        }
    }, [currentBulk, setCurrentBulk]);

    //Перемещение модального окна по оси Х
    useEffect(() => {
        if (svgContainerRef.current && widthSvgContainer === 0) {
            setWidthSvgContainer(svgContainerRef.current.clientWidth);
        }
    });

    if (currentBulk && bulkId)
        return (
            <div className={styles.container} id={'document'} ref={hintContainerRef}>
                <section className={styles.section}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>{currentBulk.houseName}</h1>
                        <div className={styles.amount}>
                            <span>{changeEnding('floors', currentBulkFlats[0].section.floorsCount)}</span>
                            <span>{currentBulkFlats[0].section.floorsCount}</span>
                        </div>
                        <div className={styles.amount}>
                            <span>
                                {changeEnding(
                                    'flat',
                                    currentBulks
                                        .map((item) => item.flatsCount)
                                        .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0),
                                )}
                            </span>
                            <span>
                                {currentBulks
                                    .map((item) => item.flatsCount)
                                    .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)}
                            </span>
                        </div>
                        <div className={styles.deadlines}>
                            {/*<DeadlineMessage*/}
                            {/*    text={'ввод в эксплуатацию'}*/}
                            {/*    date={`${getFormatDate(currentBulk.settlement_date)}`}*/}
                            {/*    theme={'dark'}*/}
                            {/*/>*/}
                            <DeadlineMessage text={'Выдача ключей'} date={`${getQuarter(currentBulk.keyDate)}`} theme={'dark'} />
                        </div>
                    </div>
                    <div className={styles.center} ref={svgContainerRef}>
                        <div className={styles.center__content}>
                            {!(currentBulk.houseName.toLowerCase() === 'reds' || currentBulk.houseName.toLowerCase() === 'whites') ? (
                                <SoloBulkSvg
                                    bulkId={+bulkId}
                                    houseName={currentBulk.houseName.toLowerCase()}
                                    className={styles.bulk}
                                    amountFloors={currentBulkFlats[0].section.floorsCount}
                                    containerWidth={widthSvgContainer}
                                />
                            ) : (
                                <DoubleBulkSvg
                                    bulkId={+bulkId}
                                    houseName={currentBulk.houseName.toLowerCase()}
                                    className={styles.bulk}
                                    amountFloors={currentBulkFlats[0].section.floorsCount}
                                    bulkIds={bulkIds}
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.compass}>
                            <Compass />
                        </div>
                        <div className={styles.map}>
                            <MiniMap houseName={currentBulk.houseName.toLowerCase()} theme={'light'} separation={true} />
                            <span className={styles.span}>ул. пресненский вал</span>
                        </div>
                    </div>
                </section>
                <Hint orientation={'left'}>
                    <>
                        <div className={styles.number}>
                            <span>{currentFloor}</span>
                            <span>этаж</span>
                        </div>
                        <div className={styles.info__block}>
                            {flatsOnActiveFloor.map((item) => {
                                if (item.flats.length === 0) return;
                                return (
                                    <div className={styles.flat__block} key={'id' + item.id}>
                                        <FlatLabel text={item.id} />
                                        <div className={styles.flat__info}>
                                            <div className={styles.flat__amount}>
                                                {item.flats.length} {changeEnding('flat', item.flats.length)}
                                            </div>
                                            <div className={styles.flat__cost}>от {Math.round(item.cost / 1000000)} млн</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                </Hint>
            </div>
        );
    return null;
};

export default BulkComponent;
