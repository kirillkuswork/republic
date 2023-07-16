import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './ImageModalCard.module.scss';

export interface IImageModalCard {
    src: string | StaticImageData;
    text: string;
    textStyle: 'h3' | 'h4';
    objectFit?: 'contain' | 'cover';
    useImg?: boolean;
    isMain?: boolean;
    logo?: string;
}

const ImageModalCard: React.FC<IImageModalCard> = ({ src, text, textStyle, objectFit, useImg, isMain, logo }) => {
    return (
        <>
            {src && (
                <div className={styles.container}>
                    <div className={`${styles.img} ImageModalCard-img ${isMain ? styles['main'] : ''}`}>
                        <>
                            {useImg ? (
                                <img src={src as string} alt={''} className={styles.imgPure} />
                            ) : (
                                <Image src={src} fill={true} alt={''} sizes={'40vw'} className={objectFit ? styles[objectFit] : ''} />
                            )}
                        </>
                    </div>
                    <span className={`${styles.text} ${styles[textStyle]}`} dangerouslySetInnerHTML={{ __html: text }} />
                    {logo && <img src={logo} alt="" className={styles.logo}/>}
                </div>
            )}
        </>
    );
};

export default ImageModalCard;
