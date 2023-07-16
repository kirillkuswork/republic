import React, { useEffect, useMemo, useState } from 'react';
import styles from './TermsInstallment.module.scss';
import { IApiTerms } from '../../../../../../store/api/apiTypes';
import CardContent from '../../card-content/CardContent';

interface ITermsInstallment {
    specialInstallments: IApiTerms;
    installments: IApiTerms;
}

const TermsInstallment: React.FC<ITermsInstallment> = ({ specialInstallments, installments }) => {
    return (
        <>
            <section className={styles.section_container}>
                <div className={styles.card_container__wrap}>
                    {specialInstallments.description.map((installment, i, row) => {
                        return <CardContent type={'installment'} title={installment.title} desc={installment.item} key={i} />;
                    })}
                    {installments.description.map((installment, i, row) => {
                        return <CardContent type={'installment'} title={installment.title} desc={installment.item} key={i} />;
                    })}
                </div>
            </section>
        </>
    );
};

export default TermsInstallment;
