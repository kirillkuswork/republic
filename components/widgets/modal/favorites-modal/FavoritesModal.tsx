import React, { useEffect, useState } from 'react';
import { Blur, Slide } from 'transitions-kit';
import SvgIcons from '../../../svgs/SvgIcons';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import styles from './FavoritesModal.module.scss';
import { getAllFlats } from '../../../../store/slices/selectors';
import FavoritesFormModal from './form/FavoritesFormModal';
import ListTableHeader from '../../pages/list/list-table-header/ListTableHeader';
import { fetchCatalog } from '../../../../store/api/api';
import ListItem from '../../pages/list/list-item/ListItem';
import ListCard from '../../pages/list/list-card/ListCard';
import changeEnding from '../../../../tools/change-ending';
import { addApartmentToFavorites } from '../../../../store/slices/catalog/catalogSlice';
import Link from 'next/link';
import ROUTES from '../../../../constants/routes';
import { isMobile } from 'react-device-detect';
import { IApiCatalogFlat } from '../../../../store/api/apiTypes';
import FavoritesSelector from './favorites-selector/FavoritesSelector';
import AnimatedIconButton from '../../../features/buttons/animated-icon-button/AnimatedIconButton';
import AnimatedSimpleButton from '../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

interface ICallOrderModal {
    show: boolean;
    closeModal: () => void;
}

const FavoritesModalComponent: React.FC<ICallOrderModal> = ({ show, closeModal }) => {
    const dispatch = useAppDispatch();
    let freeFlatsId = useAppSelector((state) => state.catalogPage.freeFlatsId);
    const width = useAppSelector((state) => state.main.width);
    const { tablet } = useAppSelector((state) => state.main.breakpoint);
    const allFlats = useAppSelector(getAllFlats);
    const favoriteList = useAppSelector((state) => state.catalogPage.favoriteList);
    const widthMobile = useAppSelector((state) => state.main.breakpoint.mobile);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        //Запрос каталога в случае, если в слайсе нет данных о квартирах
        if (allFlats.length === 0) {
            dispatch(fetchCatalog());
        }
    }, [dispatch, allFlats.length]);

    useEffect(() => {
        freeFlatsId.forEach((item) => {
            let flat = allFlats.find((elem) => elem.id === +item);

            if (flat) {
                dispatch(addApartmentToFavorites(flat));
            }
        });
    }, [freeFlatsId, allFlats]);

    let flatsIdsString = '';

    let getIdsString = () => {
        const localStorageJson = localStorage.getItem('favoriteList');

        if (localStorageJson !== null) {
            if (localStorage.getItem('favoriteList')) {
                const localStorageArray: IApiCatalogFlat[] = JSON.parse(localStorageJson);
                localStorageArray.forEach((item) => {
                    flatsIdsString += item.id + '|';
                });
                flatsIdsString = flatsIdsString.slice(0, -1);
            }
        }

        return flatsIdsString;
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <>
            <Blur in={show} timeout={300}>
                <div className={styles.darkBg}></div>
            </Blur>
            <Slide in={show} timeout={300} direction='left'>
                <div className={styles.component}>
                    <AnimatedIconButton
                        type={'button'}
                        variant={width < tablet ? 'round' : 'square'}
                        outline={true}
                        color={'brick'}
                        direction='up'
                        onClick={closeModal}
                        className={styles.closeModalBtn}
                    >
                        <SvgIcons id={'close'} />
                    </AnimatedIconButton>
                    <div className={styles.modal}>
                        <div className={styles.left}></div>
                        <div className={styles.right}>
                            <div className={styles.header}>
                                <h2 className={styles.h2}>избранное</h2>
                                <span className={styles.quantity}>
                                    {favoriteList.length > 0 && (
                                        <>
                                            {favoriteList.length} {changeEnding('flat', favoriteList.length)}
                                        </>
                                    )}
                                </span>
                            </div>

                            {favoriteList.length > 0 && (
                                <>
                                    <div className={styles.buttons}>
                                        <AnimatedSimpleButton
                                            text='Скачать'
                                            size={'mini'}
                                            theme={`dark-outline`}
                                            withIcon={true}
                                            iconPosition={'left'}
                                            iconAnimation={'down'}
                                            iconPermanentColor={'dark-grey'}
                                            disableIconBg={true}
                                            link={'/flats.pdf?ids=' + getIdsString()}
                                            target={'_blank'}
                                        >
                                            <SvgIcons id='arrow down' theme='dark-grey' />
                                        </AnimatedSimpleButton>
                                        <AnimatedSimpleButton
                                            text='отправить на почту'
                                            size={'mini'}
                                            theme={`dark-outline`}
                                            withIcon={true}
                                            iconPosition={'left'}
                                            iconAnimation={'down'}
                                            iconPermanentColor={'dark-grey'}
                                            disableIconBg={true}
                                            onClick={() => setShowForm(true)}
                                        >
                                            <SvgIcons id='letter' theme='dark-grey' />
                                        </AnimatedSimpleButton>
                                    </div>
                                    {width < widthTablet && <FavoritesSelector sort={'favoriteList'} />}
                                    {width > widthMobile && <ListTableHeader sort={'favoriteList'} key={`favorites-table-header`} />}
                                </>
                            )}
                            {favoriteList.length === 0 && (
                                <div className={styles.message}>
                                    <div className={styles.message__content}>
                                        <span className={styles.message__title}>Список избранного пуст</span>
                                        <span className={styles.message__text}>
                                            Добавьте квартиру в избранное{' '}
                                            {!isMobile && (
                                                <>
                                                    на{' '}
                                                    <Link onClick={() => closeModal()} href={ROUTES.visual.root} className={styles.link}>
                                                        генплане
                                                    </Link>{' '}
                                                    или
                                                </>
                                            )}{' '}
                                            с помощью{' '}
                                            <Link onClick={() => closeModal()} href={ROUTES.list} className={styles.link}>
                                                выбора по параметрам
                                            </Link>
                                            .
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className={styles.list}>
                                {favoriteList.map((item, index) => {
                                    return (
                                        <div key={index + 'item'}>
                                            {width > widthMobile ? (
                                                <ListItem flat={item} key={`favorite-${item.id}`} />
                                            ) : (
                                                <ListCard flat={item} key={`favorite-${item.id}`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
            <FavoritesFormModal show={showForm} closeModal={closeForm} />
        </>
    );
};

export const FavoritesModal = React.memo(FavoritesModalComponent);
