import * as yup from 'yup';

const namePattern = /^[^-\s][аA-яЯ, aA-zZ]/;
const maskPhonePattern = /^$|^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/i;
const phonePattern = /^$|^\+7 \([3-9]\d{2}\) \d{3}-\d{2}-\d{2}/i;

export const orderCallSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Обязательное поле')
        .matches(maskPhonePattern, 'Некорректный номер телефона')
        .matches(phonePattern, 'Проверьте код оператора или региона'),
    name: yup
        .string()
        .required('Обязательное поле')
        .matches(namePattern, 'Имя введено некорректно')
        .min(2, 'Введите минимум 2 символа')
        .max(30, 'Введено максимальное количество символов'),
});

export const favoritesSchema = yup.object({
    email: yup
        .string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Неверный формат')
        .required('Обязательное поле'),
});
