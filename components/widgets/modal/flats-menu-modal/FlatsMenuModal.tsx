import React, { RefObject, useRef } from 'react';
import { Slide } from 'transitions-kit';
import styles from './FlatsMenuModal.module.scss';
import ROUTES from '../../../../constants/routes';
import Link from 'next/link';
import SvgIcons from '../../../svgs/SvgIcons';
import useOutsideClick from '../../../../tools/hooks/useOutsideClick';
import { useRouter } from 'next/router';

export interface IFlatsMenuModal {
    show: boolean;
    closeMenuModal: () => void;
    buttonRef: RefObject<HTMLElement> | undefined;
}

const FlatsMenuModal: React.FC<IFlatsMenuModal> = ({ show, closeMenuModal, buttonRef }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    useOutsideClick([targetRef, buttonRef], closeMenuModal);
    const router = useRouter();

    return (
        <Slide in={show} direction='left'>
            <div className={styles.wrapper} ref={targetRef}>
                <Link
                    className={`${styles.card} ${ROUTES.visual.root === router.pathname ? styles.current : ''}`}
                    href={ROUTES.visual.root}
                >
                    <h4 className={styles.link}>визуальный выбор</h4>
                    <span className={styles.svg}>
                        <SvgIcons id={'visual selection'} />
                    </span>
                </Link>
                <Link className={`${styles.card} ${ROUTES.list === router.pathname ? styles.current : ''}`} href={ROUTES.list}>
                    <h4 className={styles.link}>выбор по параметрам</h4>
                    <span className={styles.svg}>
                        <SvgIcons id={'parameters selection'} />
                    </span>
                </Link>
            </div>
        </Slide>
    );
};

export default FlatsMenuModal;
