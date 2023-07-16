import React from 'react';
import styles from './FlatComponent.module.scss';
import FlatDetails from './flat-details/FlatDetails';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import FlatSchemes from './flat-schemes/FlatSchemes';
import FlatSlider from './flat-slider/FlatSlider';
import FlatSimilar from './flat-similar/FlatSimilar';
import SvgIcons from '../../../svgs/SvgIcons';
import FavoriteButton from '../../../features/buttons/favorite-button/FavoriteButton';
import Price from '../../../shared/price/Price';
import RedPrice from '../../../shared/red-price/RedPrice';
import Loader from '../../../shared/loader/Loader';
import DeadlineMessage from '../../../shared/deadline-message/DeadlineMessage';
import ROUTES from '../../../../constants/routes';
import { IApiCatalogFlat } from '../../../../store/api/apiTypes';
import { openModal } from '../../../../store/slices/callOrder/callOrderSlice';
import AnimatedIconButton from '../../../features/buttons/animated-icon-button/AnimatedIconButton';
import AnimatedSimpleButton from '../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import getQuarter from '../../../../tools/get-quarter';

export interface IFlatComponent {
    flat: IApiCatalogFlat;
}

const FlatComponent: React.FC<IFlatComponent> = ({ flat }) => {
    const dispatch = useAppDispatch();
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);
    const deadline = useAppSelector((state) => state.main.deadlines.commissioning);

    const handleShowRequestModal = () => {
        dispatch(openModal('flatForm'));
    };

    if (flat)
        return (
            <>
                <div className={styles.container}>
                    <div className={styles.flat}>
                        <h1 className={styles.title}>
                            <span className={styles.hidden}>Квартира №</span>
                            <span>{flat.number}</span>
                        </h1>
                        <div className={styles.details}>
                            <FlatDetails flat={flat} />
                        </div>
                        <div className={styles.buttons}>
                            <AnimatedIconButton
                                type={'link'}
                                variant='round'
                                outline={true}
                                color={'brick'}
                                direction='up'
                                href={`/flats.pdf?ids=${flat.id}`}
                            >
                                <SvgIcons id={'pdf'} />
                            </AnimatedIconButton>
                            <FavoriteButton flat={flat} color={'brick'} />
                        </div>
                        <div className={styles.price_block}>
                            <div className={styles.deadline}>
                                <DeadlineMessage text={deadline.text} date={`${getQuarter(flat.bulk.keyDate)}`} theme={'light'} />
                            </div>
                            <div className={styles.price}>
                                <Price flat={flat} size={'h4'} />
                                <RedPrice flat={flat} tooltip={true} size={'h4'} tooltipTheme={'base'} />
                            </div>
                        </div>
                        <div className={styles.button}>
                            <AnimatedSimpleButton
                                text={'оставить заявку'}
                                theme={'light-outline'}
                                onClick={() => handleShowRequestModal()}
                                size={'medium'}
                            />
                            {flat.bookingStatus === 'active' && (
                                <AnimatedSimpleButton
                                    text={'забронировать'}
                                    theme={'brick-filled'}
                                    link={`https://booking.forma.ru/booking?id=${flat.guid}`}
                                    size={'slim'}
                                    withIcon={true}
                                    iconPosition={'right'}
                                    iconAnimation={'right'}
                                    target={'_blank'}
                                >
                                    <SvgIcons id={'arrow right'} />
                                </AnimatedSimpleButton>
                            )}
                        </div>
                        <div className={styles.schemes}>
                            <FlatSchemes flat={flat} />
                        </div>
                        <div className={styles.button__absolute}>
                            <AnimatedSimpleButton
                                text={`квартиры в ${flat.houseName}`}
                                theme={`${width > widthTablet ? 'dark-outline' : 'light-outline'}`}
                                link={`${ROUTES.list}?house=${flat.houseName.toLowerCase()}`}
                                size={'mini'}
                            />
                        </div>
                    </div>
                    <FlatSlider flat={flat} />
                    <FlatSimilar flat={flat} />
                </div>
            </>
        );
    if (!flat) return <Loader isLoading={flat !== null} />;
    return null;
};

export default FlatComponent;
