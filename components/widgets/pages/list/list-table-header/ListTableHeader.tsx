import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import {
    changeSelectedDropdownOption,
    resetFilters,
    sortFlats,
    sortFlatsListByDropdown,
} from '../../../../../store/slices/catalog/catalogSlice';
import { MultiValue, SingleValue } from 'react-select';

import SvgIcons from '../../../../svgs/SvgIcons';
import styles from './ListTableHeader.module.scss';
import { IDropdownValue, ISortColumns, ISortParameters } from '../../../../../store/slices/catalog/catalogSliceTypes';
import MainSelect from '../../../../features/select/MainSelect';
import SimpleButton from '../../../../features/buttons/simple-button/SimpleButton';
import MainModal from '../../../modal/main-modal/MainModal';
import { disableBodyScroll, enableBodyScroll } from '../../../../../tools/body-scroll-lock';
import ListForm from '../list-form/ListForm';
import { getShownFlats } from '../../../../../store/slices/selectors';

interface IListTableHeader {
    sort: string;
    countFlats?: number;
}

interface ILabel {
    index: number;
}

const Label: React.FC<ILabel> = ({ index }) => {
    return (
        <div className={styles.label}>
            <span>{index}</span>
        </div>
    );
};

const ListTableHeader: React.FC<IListTableHeader> = ({ sort, countFlats }) => {
    const resetRef = useRef<HTMLButtonElement>(null);
    const flats = useAppSelector(getShownFlats);
    const widthMobile = useAppSelector((state) => state.main.breakpoint.mobile);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);
    const amountSelectedFilters = useAppSelector(state => state.catalogPage.amountOfSelectedParams);
    const dropdownOptions = useAppSelector((state) => state.catalogPage.dropdownOptions);
    const selectedOption = useAppSelector((state) => state.catalogPage.selectedOption);
    const sortColumns = useAppSelector((state) => state.catalogPage.sortColumns);
    const sortParameters = useAppSelector((state) => state.catalogPage.sortParameters);
    const inTableHead = useAppSelector((state) => state.catalogPage.inTableHead);
    const isTopPosition = useAppSelector((state) => state.main.isTopPosition);

    const [showModal, setShowModal] = useState(false);
    const columns: ISortColumns = { ...sortColumns };
    const parameters: ISortParameters = { ...sortParameters };

    const dispatch = useAppDispatch();

    const sorting = (value: string) => {
        dispatch(sortFlats({ value, placeCall: inTableHead, array: sort }));
    };

    let columnElements = Object.entries(columns).map(([key, value]) => {
        let direction = '';

        //Параметр в колонке таблицы равен текущему параметру сортировки?
        if (parameters.value === key) {
            direction = parameters.direction;
        }

        return (
            <div key={key} className={`${styles.cell} ${styles[direction]}`} onClick={() => sorting(key)}>
                <span>{value}</span>

                {/*Показать стрелочку*/}
                {sortParameters.value === key && !(width < widthTablet && width > widthMobile) && <SvgIcons id={'arrow down dark small'} />}
            </div>
        );
    });

    const [isDropdownOpened, setIsDropdownOpened] = useState(false);

    const handleBlur = () => {
        setIsDropdownOpened(false);
    };

    const handleFocus = () => {
        setIsDropdownOpened(true);
    };

    const handleChange = (selectedOption: SingleValue<IDropdownValue> | MultiValue<IDropdownValue>) => {
        if (!selectedOption) return;
        dispatch(changeSelectedDropdownOption(selectedOption));
    };

    useEffect(() => {
        if (selectedOption && width < widthTablet) {
            dispatch(sortFlatsListByDropdown({ value: selectedOption, array: 'shownFlats' }));
        }
    }, [selectedOption]);

    useEffect((): void => {
        showModal ? disableBodyScroll() : enableBodyScroll();
    }, [showModal]);

    const openModal = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = event?.target as Element;
        if (target.parentNode) {
            if (target.parentNode === resetRef.current) {
                event?.preventDefault();
            } else {
                setShowModal(true);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const reset = () => {
        dispatch(resetFilters());
    };

    return (
        <>
            {width > widthTablet && <div className={styles.row}>{columnElements}</div>}
            {width < widthTablet && width > widthMobile && (
                <>
                    {sort === 'shownFlats' && (
                        <div className={`${styles.block} ${!isTopPosition ? styles.show : styles.hide}`}>
                            <MainSelect
                                options={dropdownOptions}
                                value={selectedOption}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                onChange={handleChange}
                                className={`type1 ${styles.dropdown} ${isDropdownOpened ? styles.dropdown__opened : ''}`}
                            />
                            <SimpleButton text={'фильтр'} type={'button'} size={'mini'} color={'brick'} func={(event) => openModal(event)}>
                                {amountSelectedFilters !== 0 && (
                                    <>
                                        <Label index={amountSelectedFilters} />
                                        <button className={styles.button__reset} onClick={() => reset()} ref={resetRef}>
                                            <SvgIcons id={'reset filter'} theme={'light'} />
                                        </button>
                                    </>
                                )}
                            </SimpleButton>
                        </div>
                    )}
                    <div className={styles.row}>{columnElements}</div>
                </>
            )}
            {width < widthMobile && (
                <div className={`${styles.block} ${!isTopPosition ? styles.show : styles.hide}`}>
                    <MainSelect
                        options={dropdownOptions}
                        value={selectedOption}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        className={`type1 ${styles.dropdown} ${isDropdownOpened ? styles.dropdown__opened : ''}`}
                    />
                    <SimpleButton text={'фильтр'} type={'button'} size={'mini'} color={'brick'} func={(event) => openModal(event)}>
                        {amountSelectedFilters !== 0 && (
                            <>
                                <Label index={amountSelectedFilters} />
                                <button className={styles.button__reset} onClick={() => reset()} ref={resetRef}>
                                    <SvgIcons id={'reset filter'} theme={'light'} />
                                </button>
                            </>
                        )}
                    </SimpleButton>
                </div>
            )}
            <MainModal
                theme={'dark'}
                show={showModal}
                iconMobileId={'close-modal-small-light'}
                iconDesktopId={'close-modal-large-light'}
                closeModal={() => closeModal()}
            >
                <div className={styles.modal}>
                    <ListForm />
                    <div className={styles.buttons}>
                        <SimpleButton func={() => reset()} text={'сбросить'} type={'button'} size={'medium'} color={'light'} outline={true}>
                            <SvgIcons id={'reset filter circle light'} />
                        </SimpleButton>
                        <div className={styles.button__second}>
                            <SimpleButton
                                func={() => closeModal()}
                                outline={true}
                                text={countFlats === 0 ? 'ничего не найдено' : `показать ${countFlats}`}
                                type={'button'}
                                color={'light'}
                                size={'medium'}
                                disabled={countFlats === 0}
                            />
                        </div>
                    </div>
                </div>
            </MainModal>
        </>
    );
};

export default ListTableHeader;
