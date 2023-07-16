import React from 'react';
//Импорт модуля стилей
import styles from './CheckboxButton.module.scss';
import SvgIcons from '../../../svgs/SvgIcons';
import before from 'node:test';

//Создание интерфейса для пропсов компонента
export interface ICheckboxButton extends React.ComponentProps<'button'> {
    id: string;
    value: string;
    active: boolean;
    disabledText: string;
    checkboxWithIcon: boolean;
    checkboxWithoutText?: boolean;
    icon?: string;
    locationIcon?: 'before' | 'after';
    theme: 'classic' | 'dark' | 'outline-dark-grey';
    size?: 'medium' | 'mini';
    height?: number;
    themeIcon?: 'white' | 'light' | 'darker-light' | 'grey' | 'dark-grey' | 'brick' | 'brick-light';
    selectParameter(value: string, id: string): void;
}

//Компонент с входными параметрами и стилями
const CheckboxButton: React.FC<ICheckboxButton> = ({
    id,
    value,
    active,
    theme,
    selectParameter,
    icon, //Название иконки в FormaLogo
    locationIcon = 'before', //Расположение иконки
    checkboxWithIcon, //С иконкой?
    themeIcon, //Цвет иконки
    disabledText,
    checkboxWithoutText = false,
    size,
    //Нужные нам пропсы из React.ComponentProps<'button'>
    name,
    disabled,
    //Пропсы которые внимаем из p, чтобы не распаковались в <button>, так как задаем их сами
    onClick,
    className,
    //Все оставшеся доступные пропсы из React.ComponentProps<'button'>
    ...p
}) => {
    return (
        <div key={id + value} className={styles.container}>
            <button
                {...p} //Распаковываем все переданные пропсы из React.ComponentProps<'button'>
                //Эти данные перезапишут переданные в p (если там такие передавались)
                data-value={value}
                className={
                    ` ${styles[theme]} ` +
                    ` 
                            ${active ? styles.selected : ''} 
                            ${disabled ? styles.disabled : ''}  
                            ${icon ? styles.icon : ''}
                            ${size == 'mini' ? styles.mini : styles.default}
                          `
                }
                onClick={() => {
                    selectParameter(value, id);
                }}
            >
                {checkboxWithIcon && icon && locationIcon === 'before' && <SvgIcons id={icon} theme={themeIcon} />}
                {name && !checkboxWithoutText && <span>{name}</span>}
                {checkboxWithIcon && icon && locationIcon === 'after' && <SvgIcons id={icon} theme={themeIcon} />}
            </button>
            {disabled && <span className={styles.disabled__label}>{disabledText}</span>}
        </div>
    );
};

export default CheckboxButton;
