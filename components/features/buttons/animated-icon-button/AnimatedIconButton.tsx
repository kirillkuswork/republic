import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './AnimatedIconButton.module.scss';

export interface IAnimatedIconButton {
    type: 'button' | 'link' | 'Link';
    size?: 'small' | 'default' | 'big';
    href?: string;
    id?: string;
    children?: React.ReactNode;
    className?: string;
    variant: 'round' | 'square';
    color: 'white' | 'dark-grey-brick' | 'white-brick' | 'brick' | 'grey' | 'transparent-white';
    direction?: 'left' | 'right' | 'up' | 'down';
    outline?: boolean;
    isActive?: boolean;
    onClick?: () => void;
}

const AnimatedIconButton: React.FC<IAnimatedIconButton> = ({
    color = '',
    outline,
    isActive,
    size = 'default',
    direction = 'right',
    type,
    href,
    children,
    onClick,
    className,
    id,
    variant = 'round',
}) => {
    return (
        <>
            {(type === 'button' || type === 'link' || type === 'Link') && (
                <>
                    {type === 'button' && (
                        <button
                            id={id}
                            onClick={onClick}
                            className={clsx(
                                styles.button,
                                styles[variant],
                                styles[direction],
                                styles[size],
                                {
                                    [styles.outline]: outline,
                                    [styles.isActive]: isActive,
                                    [styles[color.replaceAll('-', '_')]]: color,
                                },
                                className,
                            )}
                        >
                            <span className={styles.wrapper}>
                                <span className={styles.iconWrapper}>
                                    {children}
                                    {children}
                                </span>
                            </span>
                        </button>
                    )}
                    {type === 'link' && (
                        <a
                            id={id}
                            href={href}
                            target='_blank'
                            rel='noreferrer'
                            className={clsx(
                                styles.button,
                                styles[variant],
                                styles[direction],
                                styles[size],
                                {
                                    [styles.outline]: outline,
                                    [styles.isActive]: isActive,
                                    [styles[color.replaceAll('-', '_')]]: color,
                                },
                                className,
                            )}
                        >
                            <span className={styles.wrapper}>
                                <span className={styles.iconWrapper}>
                                    {children}
                                    {children}
                                </span>
                            </span>
                        </a>
                    )}
                    {type === 'Link' && (
                        <Link
                            id={id}
                            href={href ? href : '/'}
                            onClick={onClick}
                            className={clsx(
                                styles.button,
                                styles[variant],
                                styles[direction],
                                styles[size],
                                {
                                    [styles.outline]: outline,
                                    [styles.isActive]: isActive,
                                    [styles[color.replaceAll('-', '_')]]: color,
                                },
                                className,
                            )}
                        >
                            <span className={styles.wrapper}>
                                <span className={styles.iconWrapper}>
                                    {children}
                                    {children}
                                </span>
                            </span>
                        </Link>
                    )}
                </>
            )}
        </>
    );
};

export default AnimatedIconButton;
