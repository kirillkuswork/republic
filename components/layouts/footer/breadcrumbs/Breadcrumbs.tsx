import React from 'react';
import { useRouter } from 'next/router';
import styles from './Breadcrumbs.module.scss';
import Crumb from './Crumb/Crumb';
import capitalizeFirstLetter from '../../../../tools/capitalize-first-letter';
import BULKS from '../../../../constants/bulks';
import { IApiCatalogFlat } from '../../../../store/api/apiTypes';
import { useAppSelector } from '../../../../hook';

const generatePathParts = (pathStr: string) => {
    const pathWithoutQuery = pathStr.split('?')[0];
    return pathWithoutQuery.split('/').filter((v) => v.length > 0);
};

const getDefaultTextGenerator = (subpath: string, href: string) => {
    return (
        {
            documents: 'Документы',
            reds: 'REDS',
            houses: 'Дома',
            news: 'Новости',
            favorites: 'Избранное',
            privacy: 'Политика в отношении обработки персональных данных',
            gallery: 'Галерея',
            progress: 'Ход строительства',
            'purchase-terms': 'Условия покупки',
            contacts: 'Контакты',
            about: 'О проекте',
            list: 'Квартиры',
            visual: 'Выбрать квартиру',
            //варианты оплаты
            full: '100% оплата',
            installment: 'Рассрочка',
            mortgage: 'Ипотека',
            'mortgage#calc_block': 'Ипотека',
            'trade-in': 'Трейд-ин',
            online: 'Онлайн оплата',
            cashback: 'Кэшбек',
            history: 'История',
            lifestyle: 'Лайфстайл',
            location: 'Расположение',
            commercial: 'Ритейл',
        }[subpath] ?? capitalizeFirstLetter(subpath)
    );
};

const dynamicHouseBreadcrumb = (houseId: string) => {
    const currentBulk = BULKS.find((bulk) => {
        const arr = bulk.sectionsId.split(', ');

        return arr.includes(houseId);
    });

    return currentBulk ? currentBulk.name.toUpperCase() : `Секция ${houseId}`;
};

const dynamicFloorBreadcrumb = (floorId: string) => `Этаж ${floorId}`;

//обработка динамических адресов типа айди
const getTextGenerator = (param: string, query: any, flat?: IApiCatalogFlat) => {
    return {
        floorId: dynamicFloorBreadcrumb(query.floorId),
        houseId: dynamicHouseBreadcrumb(query.houseId),
        flatId: flat ? flat?.number : query.flatId,
    }[param];
};

interface IBreadcrumbs {
    flat?: IApiCatalogFlat;
}

const Breadcrumbs: React.FC<IBreadcrumbs> = ({ flat }) => {
    const router = useRouter();
    const width = useAppSelector((state) => state.main.width);
    const mobile = useAppSelector((state) => state.main.breakpoint.mobile);

    function generateBreadcrumbs() {
        const asPathNestedRoutes = generatePathParts(router.asPath);
        const pathnameNestedRoutes = generatePathParts(router.pathname);

        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            // Pull out and convert "[post_id]" into "post_id"
            const param = pathnameNestedRoutes[idx].replace('[', '').replace(']', '');

            const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');

            return {
                href,
                textGenerator: getTextGenerator(param, router.query, flat),
                text: getDefaultTextGenerator(subpath, router.asPath),
            };
        });

        return [{ href: '/', text: 'Republic', textGenerator: null }, ...crumblist];
    }

    let breadcrumbs = generateBreadcrumbs();

    if (width <= mobile) {
        breadcrumbs = breadcrumbs.filter((crumb) => crumb.text !== 'Выбрать квартиру');
    }

    return (
        <div className={styles.breadcrumbs}>
            {breadcrumbs.map((crumb, idx) => (
                <Crumb
                    text={crumb.text}
                    href={crumb.href}
                    textGenerator={crumb.textGenerator}
                    key={idx}
                    last={idx === breadcrumbs.length - 1}
                />
            ))}
        </div>
    );
};

export default Breadcrumbs;
