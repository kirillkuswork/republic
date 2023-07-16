import React from 'react';
import Link from 'next/link';
import { ILink } from '../Footer';
import styles from './FooterNav.module.scss';

interface IFooterNav {
    links: ILink[];
}

const FooterNav: React.FC<IFooterNav> = ({ links }) => {
    return (
        <ul className={styles.Nav}>
            {links.map((item: ILink) => {
                if (item.hide) return null;
                return (
                    <li key={item.id} className={styles.NavItem}>
                        <Link href={item.path} className={styles.NavLink}>
                            {item.value}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default FooterNav;
