import styles from './VisualComponent.module.scss';
import SVG from 'react-inlinesvg';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import React, { useEffect, useState } from 'react';
import { setCurrentBulk } from '../../../../store/slices/catalog/catalogSlice';
import changeEnding from './../../../../tools/change-ending';
import Image from 'next/image';
import AsideModal from '../../modal/aside-modal/AsideModal';
import ImageModalCard from '../../cards/image-modal-card/ImageModalCard';
import DeadlineMessage from '../../../shared/deadline-message/DeadlineMessage';

import sections from './../../../../public/plans/building-img-light.jpg';

import {
    getAllFlats,
    getAmountCurrentBulkFlats,
    getAmountCurrentBulkSections,
    getCurrentBlockSettlementDate,
    getCurrentBulkName,
    getCurrentHouseNameFlats,
    getCurrentUnfinished,
    getCurrentWhiteBox,
    getFetchStatus,
} from '../../../../store/slices/selectors';
import ROUTES from '../../../../constants/routes';
import { useRouter } from 'next/router';
import Loader from '../../../shared/loader/Loader';
import { fetchCatalog } from '../../../../store/api/api';
import Compass from '../../../shared/compass/Compass';
import { isMobile } from 'react-device-detect';
import getQuarter from '../../../../tools/get-quarter';

const VisualComponent = () => {
    const router = useRouter();
    isMobile ? router.push(ROUTES.list) : null;

    const dispatch = useAppDispatch();
    const fetchStatus = useAppSelector(getFetchStatus);
    const flats = useAppSelector(getAllFlats);
    const currentBulk = useAppSelector(getCurrentBulkName);
    const amountCurrentBulkFlats = useAppSelector(getAmountCurrentBulkFlats);
    const amountCurrentBulkSections = useAppSelector(getAmountCurrentBulkSections);
    const currentWhiteBox = useAppSelector(getCurrentWhiteBox);
    const currentUnfinished = useAppSelector(getCurrentUnfinished);
    const settlementDate = useAppSelector(getCurrentBlockSettlementDate);
    const currentHouseNameFlats = useAppSelector(getCurrentHouseNameFlats);
    const deadline = useAppSelector((state) => state.main.deadlines.commissioning);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        //Запрос каталога в случае, если в слайсе нет данных о квартирах
        if (flats.length === 0) {
            dispatch(fetchCatalog());
        }
    }, [dispatch, flats.length]);

    useEffect(() => {
        beforeSvgInjection();
    }, [flats, fetchStatus]);

    const beforeSvgInjection = () => {
        const svg = document.getElementById('plan');
        if (!svg) return;
        //Получаем список элементов домов
        let housesGroup = [...Array.from(svg.children)].find((item) => item.id === 'mask');
        if (housesGroup) {
            let houses = [...Array.from(housesGroup.children)];
            if (!houses) return;
            houses.forEach((item) => {
                item.setAttribute('data-section-id', item.id);
                item.classList.add('building-scheme__build');
                if (flats.length !== 0) {
                    //Проверяем есть ли по данному houseName квартиры
                    let filteredByBulk = flats.filter((flat) => flat.houseName.toLowerCase() === item.id.toString());
                    let currentBulkId: number;
                    let anyFlat = filteredByBulk.find((flat) => flat.houseName.toLowerCase() === item.id.toString());
                    if (anyFlat) {
                        currentBulkId = anyFlat.bulk_id;
                    }

                    if (filteredByBulk.length !== 0) {
                        //Активные секции
                        item.classList.remove('building-scheme__build');
                        item.classList.add('building-scheme__build_enable');
                        showActiveLabel(item.id);
                        item.addEventListener('mouseenter', () => {
                            setShowModal(true);
                            dispatch(setCurrentBulk(item.id));
                        });
                        item.addEventListener('mouseleave', () => {
                            setShowModal(false);
                        });
                        item.addEventListener('click', () => {
                            router.push(`${ROUTES.visual.root}/${currentBulkId}`);
                        });
                    }
                }
            });
        }
    };

    const labels = ['silver', 'brown', 'gold', 'green', 'platinum', 'whites', 'reds', 'purple'];

    const labelElements = labels.map((item) => {
        return (
            <span className={`${styles.label} ${styles[item]}`} id={`label-${item}`} key={`label-${item}`}>
                {item}
            </span>
        );
    });

    const showActiveLabel = (id: string) => {
        const label = document.getElementById(`label-${id}`);

        if (label) {
            label.classList.add(styles.label__active);
        }
    };

    if (currentHouseNameFlats.length !== 0)
        return (
            <>
                <Loader isLoading={fetchStatus !== 'pending'} />
                <div className={styles.container}>
                    <section className={`${flats.length === 0 ? styles.load : ''} ${styles.section}`}>
                        <h1 className={styles.title}>выберите дом</h1>
                        <div className={styles.scheme}>
                            <SVG
                                src={'/plans/building-scheme.svg'}
                                className={'building-scheme'}
                                onLoad={() => beforeSvgInjection()}
                                id={'plan'}
                            />
							<Image src={'/plans/building-img-light.png'} alt={''} className={styles.image} fill={true} />
                            <div className={styles.labels}>{labelElements}</div>
                        </div>
                        <div className={styles.icon}>
                            <Compass />
                        </div>
                    </section>
                </div>
                <AsideModal
                    direction={'left'}
                    show={showModal}
                    bgColor={'light'}
                    childrenBottom1={
                        <div className={styles.parameters}>
                            <span>
                                {amountCurrentBulkSections} {changeEnding('sections', amountCurrentBulkSections)}
                            </span>
                            <span>
                                {currentHouseNameFlats[0].section.floorsCount}{' '}
                                {changeEnding('floors', currentHouseNameFlats[0].section.floorsCount)}{' '}
                            </span>
                            <span>
                                {currentWhiteBox && !currentUnfinished && <>White box</>}
                                {!currentWhiteBox && currentUnfinished && <>Без отделки</>}
                                {currentWhiteBox && currentUnfinished && <>White box и без отделки</>}
                            </span>
                            <span>
                                {amountCurrentBulkFlats} {changeEnding('flat', amountCurrentBulkFlats)} в продаже
                            </span>
                        </div>
                    }
                    childrenBottom2={<DeadlineMessage text={deadline.text} date={`${getQuarter(`${settlementDate}`)}`} theme={'dark'} />}
                    childrenTop={
                        <ImageModalCard src={`/images/visual/${currentBulk}.jpg`} text={currentBulk} textStyle={'h3'} objectFit='cover' />
                    }
                />
            </>
        );
    return null;
};

export default VisualComponent;
