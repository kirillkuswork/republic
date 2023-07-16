import React, { useEffect } from 'react';
import styles from './Navigation.module.scss';
import { useRouter } from 'next/router';
import ROUTES from '../../../../../constants/routes';
import { useAppSelector } from '../../../../../hook';
import CheckboxButton from '../../../../features/buttons/checkbox-button/CheckboxButton';

interface INavigation {}

const Navigation: React.FC<INavigation> = ({}) => {
    const router = useRouter();
    const navList = useAppSelector((state) => state.termsPage.navList);
    useEffect(() => {
        if (router.route + '/' === ROUTES.purchaseTerms.plainRoot) {
            changeRoute(ROUTES.purchaseTerms.mortgage);
        }
    }, []);

    const changeRoute = (value: string) => {
        switch (value) {
            case ROUTES.purchaseTerms.mortgage: {
                router.push(`${ROUTES.purchaseTerms.plainRoot}${ROUTES.purchaseTerms.mortgage}`, undefined, { shallow: true });
                break;
            }
            case ROUTES.purchaseTerms.fullPayment: {
                router.push(`${ROUTES.purchaseTerms.plainRoot}${ROUTES.purchaseTerms.fullPayment}`, undefined, { shallow: true });
                break;
            }
            case ROUTES.purchaseTerms.installmentPlan: {
                router.push(`${ROUTES.purchaseTerms.plainRoot}${ROUTES.purchaseTerms.installmentPlan}`, undefined, { shallow: true });
                break;
            }
            case ROUTES.purchaseTerms.onlinePurchase: {
                router.push(`${ROUTES.purchaseTerms.plainRoot}${ROUTES.purchaseTerms.onlinePurchase}`, undefined, { shallow: true });
                break;
            }
            case ROUTES.purchaseTerms.tradeIn: {
              router.push(`${ROUTES.purchaseTerms.plainRoot}${ROUTES.purchaseTerms.tradeIn}`, undefined, { shallow: true });
              break;
          }
        }
    };
    return (
        <div className={styles.nav_container}>
            {navList.menuItems.map((menu, i) => (
                <CheckboxButton
                    key={i}
                    disabled={false}
                    theme='outline-dark-grey'
                    name={menu.value}
                    value={menu.value}
                    disabledText=''
                    id='menu'
                    size='mini'
                    active={menu.fullpath === router.route}
                    checkboxWithIcon={false}
                    selectParameter={() => changeRoute(menu.path)}
                />
            ))}
        </div>
    );
};

export default Navigation;
