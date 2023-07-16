import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { Blur, Slide } from 'transitions-kit';
import AnimatedSimpleButton from '../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import Tooltip from '../../../../features/tooltip/Tooltip';
import SvgIcons from '../../../../svgs/SvgIcons';
import { useAppSelector } from '../../../../../hook';
import ROUTES from '../../../../../constants/routes';
import { favoritesSchema } from '../../../../../constants/validation';
import { getCookie } from '../../../../../tools/get-cookie';
import { pushDataLayer } from '../../../../../tools/push-data-layer';
import styles from './FavoritesFormModal.module.scss';

interface ICallOrderModal {
    show: boolean;
    closeModal: () => void;
}

interface IUserData {
    email: string;
}

const initialUserData: IUserData = {
    email: '',
};

const FavoritesFormModal: React.FC<ICallOrderModal> = ({ show, closeModal }) => {
    const width = useAppSelector((state) => state.main.width);
    const { tablet } = useAppSelector((state) => state.main.breakpoint);
    const [userData, setUserData] = useState<IUserData>(initialUserData);
    const [flatsIdsString, setFlatsIdsString] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [isInputValid, setIsInputValid] = useState<boolean>(true);
    const { email } = userData;
    let apartmentsNumbersString = '';

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(favoritesSchema),
        defaultValues: initialUserData,
    });

    useEffect(() => {
        if (!show) return;

        let idsList = '';
        const favoriteList = localStorage.getItem('favoriteList');

        if (!favoriteList) return;
        const localStorageArray = JSON.parse(favoriteList);

        localStorageArray.forEach((item: any) => {
            apartmentsNumbersString += item.apartmentNumber + ', ';
            idsList += item.id + '|';
        });
        apartmentsNumbersString = apartmentsNumbersString.slice(0, -2);
        idsList = idsList.slice(0, -1);
        setFlatsIdsString(idsList);
    }, [show]);

    const handleCloseRequestModal = () => {
        reset();
        closeModal();
        setIsInputValid(true);
        setSuccess(false);
        setError(false);
        setUserData(initialUserData);
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleClickSend = () => {
        if (!isValid) {
            return setIsInputValid(false);
        }
    };

    const onSubmit = (data: IUserData) => {
        if (!isValid) return;

        const newData = {
            ...data,
            'form-name': 'favoritesForm',
            'mail-theme': 'Презентация избранных предложений ЖК REPUBLIC',
            'mail-text':
                '<p><b>Благодарим вас за интерес!</b></p>' +
                '<p>Вы просматривали предложения на сайте ЖК REPUBLIC. Презентация предложений приложена к письму.</p>' +
                '<p>По всем интересующим вас вопросам обращайтесь по телефону: +7 (495) 182-54-69</p>',
            ids: flatsIdsString,
            cm_data: getCookie('cm_data'),
        };

        axios
            .post('/api/favorites/send', newData, { headers: { 'Content-Type': 'application/json' } })
            .then(() => {
                pushDataLayer('favoritesForm');
                reset();
                setSuccess(true);
                setError(false);
            })
            .catch(() => {
                setSuccess(false);
                setError(true);
            });
    };

    return (
        <>
            <Blur in={show} timeout={300}>
                <div className={styles.darkBg}></div>
            </Blur>
            <Slide in={show} direction='left'>
                <div className={styles.component}>
                    <button onClick={handleCloseRequestModal} className={styles.closeModalBtn}>
                        {width > tablet ? (
                            <SvgIcons id='close modal square outline' theme='brick' />
                        ) : (
                            <SvgIcons id='circle-stroke-close-brick' theme='brick' />
                        )}
                    </button>
                    <div className={styles.modal}>
                        <div className={styles.leftImage} />
                        <div className={styles.requestContainer}>
                            <div className={styles.requestBlock}>
                                {!success && (
                                    <>
                                        <h1 className={styles.title}>Отправить на почту</h1>
                                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                            <div className={styles.inputList}>
                                                <div
                                                    className={`${styles.inputBlock} ${
                                                        !isInputValid && errors?.email ? styles.inputError : ''
                                                    }`}
                                                >
                                                    <label htmlFor='e-mail' className={email ? styles.label : styles.labelHidden}>
                                                        e-mail
                                                    </label>
                                                    <input
                                                        type='text'
                                                        placeholder='e-mail'
                                                        className={styles.input}
                                                        {...register('email', {
                                                            onChange: (e) => handleChangeInput(e),
                                                        })}
                                                    />
                                                    <div className={styles.errorIcon}>
                                                        <Tooltip
                                                            behavior='hover'
                                                            content={errors?.email?.message || ''}
                                                            placement='bottom'
                                                            size={240}
                                                            theme='warning_for_input'
                                                        >
                                                            <SvgIcons id='error notification circle' />
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.agreement}>
                                                <p>
                                                    Нажимая на кнопку, Вы соглашаетесь с&nbsp;
                                                    <a href={ROUTES.privacy} target='_blank'>
                                                        правилами
                                                    </a>{' '}
                                                    использования сайта
                                                </p>
                                            </div>
                                            <AnimatedSimpleButton
                                                width='100%'
                                                text='Отправить'
                                                theme='brick-filled'
                                                onClick={handleClickSend}
                                                withIcon
                                            >
                                                <SvgIcons id='arrow right' />
                                            </AnimatedSimpleButton>
                                        </form>
                                        {error && (
                                            <div className={styles.showError}>
                                                <p>Не удалось отправить информацию,</p>
                                                <p>Возможно, Вы не подключены к Интернету.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                                {success && (
                                    <>
                                        <h1 className={styles.successTitle}>Готово!</h1>
                                        <p className={styles.successMessage}>
                                            Мы отправили избранные квартиры на Ваш адрес электронной почты.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
        </>
    );
};

export default FavoritesFormModal;
