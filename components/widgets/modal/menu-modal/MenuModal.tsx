import React, { RefObject, useRef, useState } from 'react';
import { Slide } from 'transitions-kit';
import styles from './MenuModal.module.scss';
import ROUTES from '../../../../constants/routes';
import Link from 'next/link';
import { useAppSelector } from '../../../../hook';
import IconButton from '../../../features/buttons/icon-button/IconButton';
import SvgIcons from '../../../svgs/SvgIcons';
import useOutsideClick from '../../../../tools/hooks/useOutsideClick';
import MenuDropdown from '../../pages/home/menu-dropdown/MenuDropdown';
import AnimatedIconButton from '../../../features/buttons/animated-icon-button/AnimatedIconButton';

export interface IMenuModal {
    show: boolean;
    closeMenuModal: () => void;
    openFavoritesModal: () => void;
    buttonRef: RefObject<HTMLElement> | undefined;
}

const MenuModal: React.FC<IMenuModal> = ({ show, openFavoritesModal, closeMenuModal, buttonRef }) => {
    const menuTop = [
        {
            title: 'О проекте',
            link: ROUTES.about,
        },
        {
            title: 'История',
            link: ROUTES.history,
        },
        {
            title: 'Дома',
            link: ROUTES.houses,
            items: [
                {
                    title: 'Reds',
                    link: `${ROUTES.houses}/reds`,
                },
                {
                    title: 'platinum',
                    link: `${ROUTES.houses}/platinum`,
                },
            ],
        },
        {
            title: 'Квартиры',
            link: ROUTES.list,
        },
        {
            title: 'Ритейл',
            link: ROUTES.commercial,
        },
        {
            title: 'Лайфстайл',
            link: ROUTES.lifestyle,
        },
        {
            title: 'Ход строительства',
            link: ROUTES.progress,
        },
        {
            title: 'Расположение',
            link: ROUTES.location,
        },
    ];
    const menuBottom = [
        {
            title: 'Галерея',
            link: ROUTES.gallery,
            items: [],
        },
        {
            title: 'Новости',
            link: ROUTES.news,
            items: [],
        },
        {
            title: 'Документация',
            link: ROUTES.documents,
            items: [],
        },
        {
            title: 'Условия покупки',
            link: ROUTES.purchaseTerms.plainRoot,
            items: [],
        },
        {
            title: 'Контакты',
            link: ROUTES.contacts,
            items: [],
        },
    ];
    const email = useAppSelector((state) => state.main.contacts.email);
    const targetRef = useRef<HTMLDivElement>(null);

    useOutsideClick([targetRef, buttonRef], closeMenuModal);

    const [openDropdown, setDropdownOpen] = useState(false);

    const changeOpenDropdown = () => {
        setDropdownOpen(!openDropdown);
    };

    return (
        <Slide in={show} direction='right'>
            <div className={styles.container}>
                <div className={styles.wrapper} ref={targetRef}>
                    <nav className={styles.top}>
                        <ul>
                            {menuTop.map((item) => {
                                return (
                                    <div key={`${item.link}`} className={styles.item_top + ' ' + styles.item}>
                                        {item.items ? (
                                            <li>
                                                <div className={`${styles.link} ${item.link === ROUTES.list ? styles.current : ''}`}>
                                                    <Link href={item.link}>
                                                        <span>{item.title}</span>
                                                    </Link>
                                                    <span onClick={() => changeOpenDropdown()} className={openDropdown ?  `${styles.svg} ${styles.svgUp}` : styles.svg} >
                                                        <SvgIcons id={'arrow down dark small'} />
                                                    </span>
                                                </div>
                                                <MenuDropdown items={item.items} open={openDropdown} />
                                            </li>
                                        ) : (
                                            <li>
                                                <Link
                                                    href={`${item.link}`}
                                                    className={`${item.link === ROUTES.list ? styles.current : ''}`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        )}
                                    </div>
                                );
                            })}
                            <div className={`${styles.item} ${styles.item_top}`}>
                                <li>
                                    <button onClick={() => openFavoritesModal()} className={styles.button__favorites}>
                                        Избранное
                                    </button>
                                </li>
                            </div>
                        </ul>
                    </nav>
                    <nav className={styles.bottom}>
                        <ul>
                            {menuBottom.map((item) => {
                                return (
                                    <li className={styles.item_bottom + ` ` + styles.item} key={item.link}>
                                        <Link href={item.link}>{item.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className={styles.footer}>
                            <a href={email.link} className={styles.item_bottom}>
                                {email.text}
                            </a>
                            <div className={styles.buttons}>
                                <AnimatedIconButton
                                    type={'link'}
                                    href='https://vk.com/republic.forma'
                                    variant='round'
                                    outline={true}
                                    color={'dark-grey-brick'}
                                    direction='up'
                                >
                                    <SvgIcons id={'vk logo'} />
                                </AnimatedIconButton>
                                <AnimatedIconButton
                                    type={'link'}
                                    href='https://t.me/republic_forma'
                                    variant='round'
                                    outline={true}
                                    color={'dark-grey-brick'}
                                    direction='up'
                                    className={styles.tg}
                                >
                                    <SvgIcons id={'tg logo'} />
                                </AnimatedIconButton>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </Slide>
    );
};

export default MenuModal;
