import React from 'react';
import styles from './IconButton.module.scss';
import Link from 'next/link';

export interface IIconButton {
    type: 'button' | 'link' | 'Link' | 'number';
    link?: string;
    children?: React.ReactNode;
    func?: () => void;
}

const IconButton: React.FC<IIconButton> = ({ type, link, children, func }) => {
    const handleClick = () => {
        if (func) {
            func();
        }
    };

    return (
        <>
            {(type === 'button' || type === 'link' || type === 'Link') && (
                <div className={`${styles.button}`}>
                    <>
                        {type === 'button' && <button onClick={() => handleClick()}>{children}</button>}
                        {type === 'link' && (
                            <a href={link} target='_blank' rel='noreferrer'>
                                {children}
                            </a>
                        )}
                        {type === 'Link' && (
                            <Link href={link ? link : '/'} onClick={() => handleClick()}>
                                {children}
                            </Link>
                        )}
                    </>
                </div>
            )}
            {type === 'number' && <div className={styles.numberIcon}>{children}</div>}
        </>
    );
};

export default IconButton;
