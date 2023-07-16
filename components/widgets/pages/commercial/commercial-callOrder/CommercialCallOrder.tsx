import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderCallSchema } from '../../../../../constants/validation';
import { getCookie } from '../../../../../tools/get-cookie';
import { pushDataLayer } from '../../../../../tools/push-data-layer';
import Tooltip from '../../../../features/tooltip/Tooltip';
import { useAppSelector, useAppDispatch } from '../../../../../hook';
import SvgIcons from '../../../../svgs/SvgIcons';
import SimpleButton from '../../../../features/buttons/simple-button/SimpleButton';
import AnimatedSimpleButton from '../../../../features/buttons/animated-simple-button/AnimatedSimpleButton';
import InputPhone from '../../../../features/inputs/InputPhone';
import { openModal } from '../../../../../store/slices/callOrder/callOrderSlice';
import styles from './CommercialCallOrder.module.scss';

interface IUserData {
    name: string;
    phone: string;
}

const initialUserData: IUserData = {
    name: '',
    phone: '',
};

export interface ICommercialCallOrder {}

const CommercialCallOrder: React.FC<ICommercialCallOrder> = ({}) => {
    const dispatch = useAppDispatch();
    const width = useAppSelector((state) => state.main.width);
    const [userData, setUserData] = useState<IUserData>(initialUserData);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [isInputValid, setIsInputValid] = useState<boolean>(true);
    const { name, phone } = userData;
    const formName = 'commercialForm';

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

        let newDataJson = JSON.stringify(newData);
        axios.post('/api/other_information', newDataJson, {
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

    const handleShowRequestModal = () => {
        dispatch(openModal(formName));
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>
                    получить Подробную информации о&nbsp;<span className={styles.titleBrick}>помещениях</span> и&nbsp;их&nbsp;бронировании
                </div>

                {width > 1023 && (
                    <div className={styles.requestBlock}>
                        {!success && (
                            <>
                                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                    <div className={styles.inputList}>
                                        <div className={`${styles.inputBlock} ${!isInputValid && errors?.name ? styles.inputError : ''}`}>
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

                                        <div className={`${styles.inputBlock} ${!isInputValid && errors?.phone ? styles.inputError : ''}`}>
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

                                    <AnimatedSimpleButton
                                        width='32%'
                                        text='оставить заявку'
                                        theme='brick-filled'
                                        onClick={handleClickSend}
                                        withIcon
                                    >
                                        <SvgIcons id='arrow right' />
                                        {/* <SvgIcons id='arrow next dark small' /> */}
                                    </AnimatedSimpleButton>
                                </form>
                                {error && (
                                    <div className={styles.showError}>
                                        <p>Не&nbsp;удалось отправить информацию. Возможно, Вы&nbsp;не&nbsp;подключены к&nbsp;Интернету.</p>
                                    </div>
                                )}
                            </>
                        )}
                        {success && (
                            <>
                                <p className={styles.title}>
                                    <span className={styles.titleBrick}>Cпасибо!</span>&nbsp; Мы получили заявку. Наш менеджер свяжется
                                    с&nbsp;Вами в&nbsp;ближайшее время.
                                </p>
                            </>
                        )}
                    </div>
                )}
                {width <= 1023 && (
                    <div className={styles.requestBtn}>
                        <SimpleButton
                            color='light'
                            outline
                            size='default'
                            width='fit-content'
                            text='Оставить заявку'
                            type='button'
                            func={handleShowRequestModal}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommercialCallOrder;
