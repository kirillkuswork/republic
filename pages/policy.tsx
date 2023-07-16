import { NextPageWithLayout } from './page';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import PolicyComponent from '../components/widgets/pages/policy/PolicyComponent';

const Policy: NextPageWithLayout = () => {
    return <PolicyComponent />;
};

export default Policy;

Policy.getLayout = (page) => {
    return (
        <PrimaryLayout theme='light' header_theme='light' height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
