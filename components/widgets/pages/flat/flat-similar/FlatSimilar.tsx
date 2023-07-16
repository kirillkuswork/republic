import React, { useEffect, useState } from 'react';
import styles from './FlatSimilar.module.scss';
import { IApiCatalogFlat } from '../../../../../store/api/apiTypes';
import SimpleButton from '../../../../features/buttons/simple-button/SimpleButton';
import SvgIcons from '../../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../../hook';
import FlatCard from '../../../cards/flat-card/FlatCard';
import ROUTES from '../../../../../constants/routes';
import AnimatedSimpleButton from '../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';

export interface IFlatSimilar {
    flat: IApiCatalogFlat;
}

const FlatSimilar: React.FC<IFlatSimilar> = ({ flat }) => {
    const width = useAppSelector((state) => state.main.width);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const [showFlats, setShowFlats] = useState<IApiCatalogFlat[]>(flat.similar);
    const [count, setCount] = useState<number>(1);
    const [perPage] = useState<number>(2);

    //Количество отображаемых квартир
    useEffect(() => {
        if (width > widthTablet) {
            setShowFlats(flat.similar.slice(0, 4));
        } else {
            setShowFlats(flat.similar.slice(0, count * perPage));
        }
    }, [flat.similar, count, setShowFlats]);

    //"Показать все"
    const changeCountFlats = () => {
        setShowFlats(flat.similar.slice(0, flat.similar.length));
    };

    useEffect(() => {
        setCount(1);
    }, [flat.similar]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Похожие квартиры</h2>
                {width > widthTablet && (
                    <AnimatedSimpleButton
                        text={'Показать все'}
                        theme={'dark-outline'}
                        link={`${ROUTES.list}?house=${flat.houseName.toLowerCase()}&&rooms=${flat.rooms}&&finish=${
                            flat.attributes.whiteBox ? 'whiteBox' : 'woWhitebox'
                        }`}
                        withIcon={true}
                    >
                        <SvgIcons id='arrow right' />
                    </AnimatedSimpleButton>
                )}
            </div>
            <div className={styles.cards}>
                {showFlats.map((item) => {
                    return <FlatCard flat={item} key={item.id} />;
                })}
            </div>
            <div className={styles.button__mobile}>
                {width < widthTablet && flat.similar.length > 0 && flat.similar.length > showFlats.length && (
                    <SimpleButton
                        text={'Показать все'}
                        type={'button'}
                        color={'dark-grey'}
                        size={'medium'}
                        outline={true}
                        func={() => changeCountFlats()}
                    >
                        <SvgIcons id={'arrow down dark'} />
                    </SimpleButton>
                )}
            </div>
        </div>
    );
};

export default FlatSimilar;
