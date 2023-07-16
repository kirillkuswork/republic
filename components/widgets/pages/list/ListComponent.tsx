import React, { useEffect, useState } from 'react';
import SvgIcons from '../../../svgs/SvgIcons';
import styles from './ListComponent.module.scss';
import ListTableHeader from './list-table-header/ListTableHeader';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { resetFilters, setCount, sortFlats, toggleActiveSearchParams } from '../../../../store/slices/catalog/catalogSlice';
import ListItem from './list-item/ListItem';
import ListCard from './list-card/ListCard';
import ListForm from './list-form/ListForm';
import Loader from '../../../shared/loader/Loader';
import SimpleButton from '../../../features/buttons/simple-button/SimpleButton';
import { IApiCatalogFlat } from '../../../../store/api/apiTypes';
import { getAllFlats, getFetchStatus, getShownFlats, getSortParameters } from '../../../../store/slices/selectors';
import { useRouter } from 'next/router';
import { fetchCatalog } from '../../../../store/api/api';

interface IListComponent {}

const ListComponent: React.FC<IListComponent> = () => {
    const dispatch = useAppDispatch();
    const params = useRouter().query;
    const router = useRouter();

    const flatsShown = useAppSelector(getShownFlats);
    const allFlats = useAppSelector(getAllFlats);
    const sortParameters = useAppSelector(getSortParameters);
    const inForm = useAppSelector((state) => state.catalogPage.inForm);
    const count = useAppSelector((state) => state.catalogPage.countPage);
    const perPage = useAppSelector((state) => state.catalogPage.perPage);
    const fetchStatus = useAppSelector(getFetchStatus);
    const widthMobile = useAppSelector((state) => state.main.breakpoint.mobile);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);
    const selectedOption = useAppSelector((state) => state.catalogPage.selectedOption);

    const [flats, setFlats] = useState<IApiCatalogFlat[]>(flatsShown);
    const [showFlats, setShowFlats] = useState<IApiCatalogFlat[]>(flats);

    const onlyPromo = useAppSelector((state) => state.catalogPage.onlyPromo);
    const [countFlats, setCountFlats] = useState(0);
    // фильтр квартир по акции
    useEffect(() => {
        let flatsFitltered = flatsShown;
        if (onlyPromo) {
            // flatsFitltered = flatsShown.filter((flat: IApiCatalogFlat) => flat.promo === true && flat.redPrice === false);
            flatsFitltered = flatsShown.filter((flat: IApiCatalogFlat) => flat.promo === true );
        } else {
            flatsFitltered = flatsShown;
        }
        setFlats(flatsFitltered);
        setCountFlats(flatsFitltered.length)
    }, [flatsShown, onlyPromo]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [selectedOption]);

    useEffect(() => {
        //Запрос каталога в случае, если в слайсе нет данных о квартирах
        if (allFlats.length === 0) {
            dispatch(fetchCatalog());
        }
    }, [dispatch, allFlats.length]);

    //Количество отображаемых квартир
    useEffect(() => {
        if (width > widthMobile) {
            setShowFlats(flats);
        } else {
            setShowFlats(flats.slice(0, count * perPage));
        }
    }, [flats, count, setShowFlats]);

    //"Показать еще"
    const changeCountFlats = () => {
        dispatch(setCount(null));
        setShowFlats(flats.slice(0, count * perPage));
    };

    const selectParameter = (value: string, id: string) => {
        //Изменение состояния искомого параметра на активное
        dispatch(toggleActiveSearchParams({ value, id }));
        //сортировка получившегося массива по кретерию в шапке таблицы
        dispatch(sortFlats({ value: sortParameters.value, placeCall: inForm, array: 'shownFlats' }));
    };

    const reset = () => {
        dispatch(resetFilters());
    };

    useEffect(() => {
        //Если в поисковой строке есть параметры для фильтра
        if (Object.keys(params).length !== 0) {
            //Сначала сбрасывает предыдущие сохраненные фильтры
            reset();

            //Фильтр по названию дома
            if (typeof params.house === 'string') {
                selectParameter(params.house, 'houseName');
            }

            //Фильтр по названию дома
            if (typeof params.rooms === 'string') {
                selectParameter(params.rooms.replace('studio', '0'), 'rooms');
            }

            //Фильтр по whiteBox
            if (typeof params.finish === 'string') {
                selectParameter(params.finish, 'finish');
            }
        }
    }, [router]);

    return (
        <>
            <Loader isLoading={fetchStatus !== 'pending'} />
            <div className={styles.container}>
                <section className={styles.list}>
                    <div className={styles.header}>
                        <div className={styles.left}>
                            <h2 className={styles.h2}>квартиры</h2>
                            <span className={styles.quantity}>{countFlats > 0 && <>{countFlats} найдено</>}</span>
                        </div>
                        <button className={styles.reset} onClick={() => reset()}>
                            <span className={styles.resetSpan}>Сбросить фильтр</span>
                            <SvgIcons id='reset filter' />
                        </button>
                    </div>
                    <ListTableHeader sort={'shownFlats'} countFlats={countFlats}/>
                    <div id={'list'}>
                        {showFlats.map((item, index) => {
                            return (
                                <div key={index}>
                                    {width > widthMobile ? (
                                        <ListItem flat={item} key={`list-${item.id}`} />
                                    ) : (
                                        <ListCard flat={item} key={`list-${item.id}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {flats.length === 0 && (
                        <div className={styles.message}>
                            <span className={styles.message__title}>ничего не найдено</span>
                        </div>
                    )}
                </section>
                {width > widthTablet && <ListForm />}
            </div>
            {width < widthMobile && flats.length > 0 && flats.length > perPage && flats.length > perPage * count && (
                <div className={styles.showMore}>
                    <SimpleButton
                        text={'Показать еще'}
                        type={'button'}
                        size={'medium'}
                        color={'light'}
                        outline={true}
                        func={() => changeCountFlats()}
                    >
                        <SvgIcons id={'arrow down light'} />
                    </SimpleButton>
                </div>
            )}
        </>
    );
};

export default ListComponent;
