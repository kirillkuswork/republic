import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import Slider from '../../slider/Slider';
import SimpleButton from '../../../features/buttons/simple-button/SimpleButton';
import ContactsMap from './contacts-map/ContactsMap';
import SvgIcons from '../../../svgs/SvgIcons';
import { useAppSelector, useAppDispatch } from '../../../../hook';
import apiURL from '../../../../constants/API';
import styles from './ContactsComponent.module.scss';
import { openModal } from '../../../../store/slices/callOrder/callOrderSlice';

export interface IContactsComponent {}

const ContactsComponent: React.FC<IContactsComponent> = () => {
    const dispatch = useAppDispatch();
    const { email, phone, time, address } = useAppSelector((state) => state.main.contacts);
    const { tablet } = useAppSelector((state) => state.main.breakpoint);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const slideHeight = windowWidth > tablet ? '66.7vh' : '39.1vh';

    useEffect(() => {
        getImages();
        detectSizes();
        window.addEventListener('resize', detectSizes);

        return () => {
            window.removeEventListener('resize', detectSizes);
        };
    }, []);

    const getImages = async (): Promise<void> => {
        try {
            const response = await axios.get(apiURL.urlSliderContacts);
            const images = response.data?.absolutePath;
            setImages(images);
        } catch (err) {
            console.log('err', err);
        }
    };

    const detectSizes = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleShowRequestModal = () => {
        dispatch(openModal('contactForm'));
    };

    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
            </Head>
            <div className={styles.contacts}>
                <div className={styles.preview}>
                    <h1 className={styles.title}>Контакты</h1>
                    <div className={styles.slider}>
                        {images.length > 0 && (
                            <Slider
                                size='content'
                                arrow
                                positionArrows='arrows_left'
                                isLoop={true}
                                slideWidth='100%'
                                slideHeight={slideHeight}
                                navigationColor='dark-grey-brick'
                            >
                                {images.map((url, index) => (
                                    <Image
                                        unoptimized={true}
                                        key={index}
                                        src={url}
                                        alt='office'
                                        fill
                                        sizes='(max-width: 1023px) 100vw, 70vw'
                                        priority
                                    />
                                ))}
                            </Slider>
                        )}
                    </div>
                    <div className={styles.info}>
						<a href={`${email.link}`} className={styles.email}>
                            {email.text}
                        </a>
                        <a href={`tel:${phone.link}`} className={styles.phone}>
                            {phone.text}
                        </a>
                        <SimpleButton
                            color='dark-grey'
                            outline
                            size='default'
                            text='Заказать звонок'
                            type='button'
                            func={handleShowRequestModal}
                        />
                        <h5 className={styles.description}>
                            Дизайн-пространство Republic украшает старинная промышленная чугунная плитка, которую удалось спасти от
                            забвения, очистив от бетона и подвергнув пескоструйной обработке.
                        </h5>
                    </div>
                </div>
                <div className={styles.location}>
                    <div className={styles.placement}>
                        <h3>Дизайн-пространство</h3>
                        <h3 className={styles.address}>{address.text}</h3>
                        <p className={styles.time}>{time.text}</p>
                        <div className={styles.placement_buttons}>
                            <SimpleButton
                                color='dark-grey'
                                outline
                                size='default'
                                text='Построить маршрут'
                                type='link'
                                link='https://yandex.ru/maps/-/CCUCMSugkB'
                            />
                            <SimpleButton
                                color='dark-grey'
                                outline
                                size='default'
                                text='Схема проезда'
                                type='link'
                                iconPosition='left'
                                link='https://cdn.forma.ru/republic/navigation.pdf'
                            >
                                <SvgIcons id='arrow down' theme='dark-grey' />
                            </SimpleButton>
                        </div>
                    </div>
                    <ContactsMap />
                </div>
            </div>
        </>
    );
};

export default ContactsComponent;
