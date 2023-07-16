import React, { useEffect, useState } from 'react';
import styles from './FlatSlider.module.scss';
import Slider from '../../../slider/Slider';
import Image from 'next/image';
import apiUrls from '../../../../../constants/API';
import axios from 'axios';
import { IApiCatalogFlat } from '../../../../../store/api/apiTypes';

export interface IFlatSlider {
    flat: IApiCatalogFlat;
}

const FlatSlider: React.FC<IFlatSlider> = ({ flat }) => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (flat.houseName) {
            getImages();
        }
    }, [flat.houseName]);

    const getImages = async (): Promise<void> => {
        try {
            let url = '';

            if (flat.houseName.toLowerCase() === 'reds') {
                url = apiUrls.urlFlatReds;
            } else if (flat.houseName.toLowerCase() === 'platinum' && flat.attributes.roomOnSouth) {
                url = apiUrls.urlFlatPlatinum;
            } else if (
                flat.houseName.toLowerCase() === 'platinum' &&
                ((flat.attributes.roomOnNorth && flat.attributes.oknaNa2Storony) ||
                    (flat.attributes.roomOnNorth && flat.attributes.roomOnWest) ||
                    (flat.attributes.roomOnEast && flat.attributes.roomOnNorth))
            ) {
                url = apiUrls.urlFlatPlatinum2;
            } else {
                url = apiUrls.urlFlatPlatinum3;
            }

            const response = await axios.get(url);
            const images = response.data?.absolutePath;
            setImages(images);
        } catch (err) {
            console.log('err', err);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <span>Дизайн</span>
                <span>интерьеров</span>
            </h2>
            {images && images.length > 0 && (
                <Slider size={'content'} arrow={true} isLoop={true} navigationColor='dark-grey-brick'>
                    {images.map((url, index) => (
                        <div className={styles.img} key={index}>
                            <Image src={url} alt={''} fill={true} key={url} unoptimized={true} />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default FlatSlider;
