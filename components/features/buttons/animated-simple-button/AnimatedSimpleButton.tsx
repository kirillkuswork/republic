import React from 'react';
import clsx from 'clsx';
import styles from './AnimatedSimpleButton.module.scss';

export interface IAnimatedSimpleButton {
    text: string;
    link?: string;
    onClick?: (event?: React.MouseEvent) => void;
    withIcon?: boolean;
    iconAnimation?: 'left' | 'right' | 'up' | 'down';
    iconPosition?: 'right' | 'left';
    iconPermanentColor?: 'white' | 'light' | 'darker-light' | 'grey' | 'dark-grey' | 'brick' | 'brick-light' | 'light-grey';
    disableIconBg?: boolean;
    size?: 'default' | 'mini' | 'medium' | 'slim';
    fontSize?: 'default' | 'font14';
    width?: string;
    theme: 'light-outline' | 'dark-outline' | 'brick-filled' | 'light-grey-outline' | string;
    className?: string;
    children?: React.ReactNode;
    target?: '_blank' | '_self';
}

const AnimatedSimpleButton: React.FC<IAnimatedSimpleButton> = ({
    text,
    link,
    onClick,
    withIcon,
    iconAnimation = 'right',
    iconPosition = 'right',
    disableIconBg,
    iconPermanentColor,
    size = 'default',
    fontSize = 'default',
    width,
    theme,
    className,
    children,
    target = '_self',
}) => {
    const styleWidth = width ? { width } : {};

    const iconBlock = (
        <div className={styles.icon} style={{ background: disableIconBg ? 'transparent' : undefined }}>
            <div className={clsx(styles.icon_svg_container, styles[`svg_container_${iconAnimation}`])}>
                {children}
                {children}
            </div>
        </div>
    );

    return (
        <>
            {link && target === '_blank' ? (
                <a
                    className={clsx(
                        styles.container,
                        styles[size],
                        styles[fontSize],
                        styles[`container_${theme.replaceAll('-', '_')}`],
                        styles[`container_icon_hover_${iconAnimation}`],
                        styles[`icon_permanent_color_${iconPermanentColor?.replaceAll('-', '_')}`],
                        className,
                    )}
                    style={styleWidth}
                    href={link}
                    target={target}
                >
                    <div className={styles.content}>
                        {withIcon && iconPosition === 'left' && iconBlock}
                        <button>
                            <span>{text}</span>
                        </button>
                        {withIcon && iconPosition === 'right' && iconBlock}
                    </div>
                </a>
            ) : (
                <div
                    className={clsx(
                        styles.container,
                        styles[size],
                        styles[`container_${theme.replaceAll('-', '_')}`],
                        styles[`container_icon_hover_${iconAnimation}`],
                        styles[`icon_permanent_color_${iconPermanentColor?.replaceAll('-', '_')}`],
                        className,
                    )}
                    style={styleWidth}
                    onClick={onClick ? (event) => onClick(event) : link ? () => window.open(link, target) : undefined}
                >
                    <div className={styles.content}>
                        {withIcon && iconPosition === 'left' && iconBlock}
                        <button>
                            <span>{text}</span>
                        </button>
                        {withIcon && iconPosition === 'right' && iconBlock}
                    </div>
                </div>
            )}
        </>
    );
};

export default AnimatedSimpleButton;
