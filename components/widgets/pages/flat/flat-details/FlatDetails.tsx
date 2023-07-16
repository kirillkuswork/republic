import React, { useEffect, useState } from 'react';
import { IApiCatalogFlat } from '../../../../../store/api/apiTypes';
import styles from './FlatDetails.module.scss';
import FlatTableElement from '../flat-table-element/FlatTableElement';
import editRoomsLabel from '../../../../../tools/edit-rooms-label';
import { AdvantageIcons } from '../../../../features/advantage-icons/AdvantageIcons';
import FinishIcons from '../../../../shared/finish-icons/FinishIcons';
import { useAppSelector } from '../../../../../hook';
import { advantagesType } from '../../../../../models';

export interface IFlatDetails {
    flat: IApiCatalogFlat | null;
}

const FlatDetails: React.FC<IFlatDetails> = ({ flat }) => {
    if (!flat) return <></>;

    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);
    const advantages = useAppSelector((state) => state.catalogPage.filterParameters.byCheckbox.advantages);
    const advantagesSvgIcons = useAppSelector((state) => state.catalogPage.filterParameters.advantagesSvgIcons);
    const [currentAdvantages, setCurrentAdvantages] = useState<advantagesType[]>();

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

    let rooms = editRoomsLabel(flat);

    return (
        <div className={styles.container}>
            {flat && (
                <div className={styles.wrapper}>
                    <div className={`${styles.table} ${styles.table__margin}`}>
                        <div className={styles.row}></div>

                        <FlatTableElement title={'спальни'}>{rooms.rooms}</FlatTableElement>
                        <FlatTableElement title={'Площадь'}>
                            {flat.area}м<sup>2</sup>
                        </FlatTableElement>

                        <div className={styles.row}></div>

                        <FlatTableElement title={'Этаж'}>{flat.floor}</FlatTableElement>
                        <FlatTableElement title={'Секция'}>{flat.section.number}</FlatTableElement>
                        <div className={styles.row}></div>
                        <FlatTableElement title={'Отделка'}>
                            <FinishIcons flat={flat} theme={'light'} withText={true} withTooltip={false} />
                        </FlatTableElement>
                        <FlatTableElement title={currentAdvantages?.length !== 0 ? 'особенности' : ''}>
                            <AdvantageIcons flat={flat} theme={'light'} short={width < widthTablet} amount={2} direction={'details'} />
                        </FlatTableElement>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlatDetails;
