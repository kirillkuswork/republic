import Link from 'next/link';
import React from 'react';
import styles from './SimpleButton.module.scss';

export interface ISimpleButton {
    text: string;
    type: 'button' | 'link' | 'Link';
    size: 'default' | 'mini' | 'medium' | 'slim';
	color: 'white' | 'light' | 'darker-light' | 'grey' | 'dark-grey' | 'brick' | 'brick-light' | 'light-grey' | 'light-brick';
    outline?: boolean;
    link?: string;
    children?: React.ReactNode;
    func?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    iconPosition?: 'right' | 'left';
    width?: string;
    disabled?: boolean;
}

const SimpleButton: React.FC<ISimpleButton> = ({
    text,
    type,
    link,
    children,
    func,
    size,
    color,
    outline,
    iconPosition,
    width,
    disabled,
}) => {
    const styleWidth = width ? { width: width } : {};

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (func) {
            func(event);
        }
    };

    return (
        <div
            className={`
                    ${styles.button}
                    ${styles[size]}
                    ${styles[color ? color.replace('-', '_') : '']}
                    ${outline ? styles.outline : ''}
                    ${iconPosition ? styles[iconPosition] : ''}
        `}
            style={styleWidth}
        >
            <>
                {type === 'button' && (
                    <button onClick={(event) => handleClick(event)} disabled={disabled ? disabled : false}>
                        <span>{text}</span>
                        <>{children}</>
                    </button>
                )}
                {type === 'link' && (
                    <a href={link} target='_blank' rel='noreferrer'>
                        <span>{text}</span>
                        <>{children}</>
                    </a>
                )}
                {type === 'Link' && (
                    <Link href={link ? link : '/'}>
                        <span>{text}</span>
                        <>{children}</>
                    </Link>
                )}
            </>
        </div>
    );
};

export default SimpleButton;
