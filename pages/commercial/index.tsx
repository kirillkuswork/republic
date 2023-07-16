import { NextPageWithLayout } from '../page';
import CommercialComponent from '../../components/widgets/pages/commercial/CommercialComponent';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';

const Commercial: NextPageWithLayout = () => {
    return <CommercialComponent />;
};

export default Commercial;

Commercial.getLayout = (page) => {
    return (
        <PrimaryLayout theme='dark' header_theme='dark' height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
