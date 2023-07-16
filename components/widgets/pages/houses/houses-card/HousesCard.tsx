import React from 'react';
import styles from './HousesCard.module.scss';
import SvgIcons from '../../../../svgs/SvgIcons';
import AnimatedIconButton from '../../../../features/buttons/animated-icon-button/AnimatedIconButton';
import Image from 'next/image';

export interface HousesCard {
    house: { name: string; architect: string; img: string };
    setActiveHouse: any;
}

const BaseTemplate: React.FC<HousesCard> = ({ house, setActiveHouse }) => {
    return (
        <div className={styles.card}>
            <div className={house.name === 'reds' || house.name === 'platinum' ? styles.noShadow : styles.shadow}>
                <Image src={`/images/houses/${house.img}`} alt='' fill={true} className={styles.img} />
            </div>
            <p className={styles.topText}>архитектор</p>
            <p className={styles.nameText}>{house.architect}</p>
            <p className={styles.bottomText}>{house.name}</p>
            {(house.name === 'reds' || house.name === 'platinum') && (
                <AnimatedIconButton
                    type={'Link'}
                    href={`/houses/${house.name}`}
                    variant='round'
                    outline={true}
                    color={'white-brick'}
                    direction='right'
                    className={styles.button}
                >
                    <SvgIcons id={'arrow right'} />
                </AnimatedIconButton>
            )}
        </div>
    );
};

export default BaseTemplate;
