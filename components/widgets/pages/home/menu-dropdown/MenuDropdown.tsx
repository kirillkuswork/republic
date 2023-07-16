import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import styles from './MenuDropdown.module.scss';
import { useAppSelector } from '../../../../../hook';

export interface IMenuDropdown {
    items: {
        title: string;
        link: string;
    }[];
    open: boolean;
}

const MenuDropdown: React.FC<IMenuDropdown> = ({ items, open }) => {
    const listRef = useRef<HTMLUListElement>(null);
    const [height, setHeight] = useState(0);
    let pathname = useAppSelector((state) => state.main.currentPath);

    useEffect(() => {
        if (listRef.current) {
            setHeight(listRef.current.scrollHeight);
        }
    }, [open, setHeight]);

    return (
        <ul className={`${styles.list} ${open ? styles.open : ''}`} ref={listRef} style={{ height: `${open ? `${height}px` : 0}` }}>
            {items.map((item) => {
                return (
                    <li key={item.link} className={`${styles.item} ${item.link === pathname ? styles.current : ''}`}>
                        <Link href={item.link}>{item.title}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default MenuDropdown;
