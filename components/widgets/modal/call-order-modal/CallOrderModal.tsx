import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { Slide } from 'transitions-kit';
import AnimatedSimpleButton from '../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import InputPhone from '../../../features/inputs/InputPhone';
import Tooltip from '../../../features/tooltip/Tooltip';
import SvgIcons from '../../../svgs/SvgIcons';
import { useAppSelector, useAppDispatch } from '../../../../hook';
import { orderCallSchema } from '../../../../constants/validation';
import ROUTES from '../../../../constants/routes';
import { getCookie } from '../../../../tools/get-cookie';
import { pushDataLayer } from '../../../../tools/push-data-layer';
import { closeModal } from '../../../../store/slices/callOrder/callOrderSlice';
import styles from './CallOrderModal.module.scss';
import AnimatedIconButton from '../../../features/buttons/animated-icon-button/AnimatedIconButton';

interface IUserData {
    name: string;
    phone: string;
}

const initialUserData: IUserData = {
    name: '',
    phone: '',
};

const CallOrderModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { show, formName } = useAppSelector((state) => state.callOrder);
    const width = useAppSelector((state) => state.main.width);
    const { tablet } = useAppSelector((state) => state.main.breakpoint);
    const [userData, setUserData] = useState<IUserData>(initialUserData);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [isInputValid, setIsInputValid] = useState<boolean>(true);
    const { name, phone } = userData;

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(orderCallSchema),
        defaultValues: initialUserData,
    });

    useEffect((): void => {
        if (show) {
			document.documentElement.classList.add('is-locked');
        } else {
			document.documentElement.classList.remove('is-locked');
        }
    }, [show]);

    const handleCloseRequestModal = () => {
        reset();
        dispatch(closeModal());
        setUserData(initialUserData);
        setSuccess(false);
        setError(false);
        setIsInputValid(true);
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
            'form-name': formName,
            cm_data: getCookie('cm_data'),
        };

        let json = JSON.stringify(newData);
        axios.post('/api/other_information', json, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        axios
            .post('/api/forms', newData, { headers: { 'Content-Type': 'application/json' } })
            .then(() => {
                pushDataLayer(formName);
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
        <Slide in={show} direction='left'>
            <div className={styles.component}>
                <AnimatedIconButton
                    type={'button'}
                    variant={width < tablet ? 'round' : 'square'}
                    outline={true}
                    color={'brick'}
                    direction='up'
                    onClick={handleCloseRequestModal}
                    className={styles.closeModalBtn}
                >
                    <SvgIcons id={'close'} />
                </AnimatedIconButton>
                <div className={styles.modal}>
                    <div className={styles.leftImage}>
                        <Image src='/images/modal/modal-image.png' alt='house' fill sizes='100vw' />
                    </div>
                    <div className={styles.requestContainer}>
                        <div className={styles.requestBlock}>
                            {!success && (
                                <>
                                    <h1 className={styles.title}>Заказать звонок</h1>
                                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                        <div className={styles.inputList}>
                                            <div
                                                className={`${styles.inputBlock} ${!isInputValid && errors?.name ? styles.inputError : ''}`}
                                            >
                                                <label htmlFor='Имя' className={name ? styles.label : styles.labelHidden}>
                                                    Имя
                                                </label>
                                                <input
                                                    type='text'
                                                    placeholder='Имя'
                                                    className={styles.input}
                                                    {...register('name', {
                                                        onChange: (e) => handleChangeInput(e),
                                                    })}
                                                />
                                                <div className={styles.errorIcon}>
                                                    <Tooltip
                                                        behavior='hover'
                                                        content={errors?.name?.message || ''}
                                                        placement='bottom'
                                                        size={240}
                                                        theme='warning_for_input'
                                                    >
                                                        <SvgIcons id='error notification circle' />
                                                    </Tooltip>
                                                </div>
                                            </div>

                                            <div
                                                className={`${styles.inputBlock} ${
                                                    !isInputValid && errors?.phone ? styles.inputError : ''
                                                }`}
                                            >
                                                <Controller
                                                    control={control}
                                                    name='phone'
                                                    render={({ field: { ref, ...field } }) => (
                                                        <InputPhone
                                                            name='phone'
                                                            field={field}
                                                            onChange={handleChangeInput}
                                                            labelClass={phone || getValues('phone') ? styles.label : styles.labelHidden}
                                                            inputClass={styles.input}
                                                            errorIconClass={styles.errorIcon}
                                                            errorMessage={errors?.phone?.message || ''}
                                                        />
                                                    )}
                                                />
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
                                    <h1 className={styles.successTitle}>Cпасибо!</h1>
                                    <p className={styles.successMessage}>
                                        Мы получили заявку. Наш менеджер свяжется с&nbsp;Вами в&nbsp;ближайшее время.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
};

export default CallOrderModal;
