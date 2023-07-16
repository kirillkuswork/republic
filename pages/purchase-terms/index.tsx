import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import TermsComponent from '../../components/widgets/pages/purchase-terms/TermsComponent';
import { useEffect } from 'react';

const Terms: NextPageWithLayout = ({}) => {
    return (
        <div>
            <TermsComponent />
        </div>
    );
};

export default Terms;

Terms.getLayout = (page) => {
    return (
        <PrimaryLayout theme='dark-light' header_theme='dark-light' height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
