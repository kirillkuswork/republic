import React, { useEffect, useState } from 'react';
import SvgIcons from '../../../svgs/SvgIcons';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { IApiCatalogFlat } from '../../../../store/api/apiTypes';
import { addApartmentToFavorites, removeApartmentById } from '../../../../store/slices/catalog/catalogSlice';
import AnimatedIconButton from '../animated-icon-button/AnimatedIconButton';

export interface IFavoriteButton {
    flat: IApiCatalogFlat;
    color?: 'white' | 'dark-grey-brick' | 'white-brick' | 'brick';
    outline?: boolean;
}

const FavoriteButton: React.FC<IFavoriteButton> = ({ flat, color = 'brick' }) => {
    const [isActive, setIsActive] = useState(false);
    const favoriteList = useAppSelector((state) => state.catalogPage.favoriteList);

    useEffect(() => {
        if (favoriteList.filter((apartment) => apartment.id === flat.id).length) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [flat, favoriteList]);

    const dispatch = useAppDispatch();

    const addToFavorite = () => {
        setIsActive(true);
        dispatch(addApartmentToFavorites(flat));
    };

    const removeFromFavorite = () => {
        setIsActive(false);
        dispatch(removeApartmentById(flat.id));
    };

    return (
        <>
            <AnimatedIconButton
                type={'button'}
                variant='round'
                outline={!isActive}
                color={color}
                direction='up'
                //@ts-ignore
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    if (isActive) {
                        removeFromFavorite();
                    } else {
                        addToFavorite();
                    }
                }}
            >
                <SvgIcons id={'heart'} />
            </AnimatedIconButton>
        </>
    );
};

export default FavoriteButton;
