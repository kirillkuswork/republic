import React from 'react';
import styles from './DetailsMainContent.module.scss';
import Image, { StaticImageData } from 'next/image';

interface IDetailsMainContentProps {
    image: StaticImageData;
    children: React.ReactNode;
}

const DetailsMainContent: React.FC<IDetailsMainContentProps> = ({ children, image }) => {
    return (
        <div className={styles.mainContent}>
            <p className={styles.mainContent__text}>{children}</p>
            <div className={styles.mainContent__img}>
                <Image src={image} fill={true} alt={'специи'} className={styles.img} sizes='(max-width: 1023px) 100vw, 70vw' />
            </div>
        </div>
    );
};

export default DetailsMainContent;
