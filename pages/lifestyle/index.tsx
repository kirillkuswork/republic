import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import LifestyleComponent from '../../components/widgets/pages/lifestyle/LifestyleComponent';

const Lifestyle: NextPageWithLayout = (props) => {
    return <LifestyleComponent />;
};

Lifestyle.getLayout = (page) => {
    return (
        <PrimaryLayout theme='transparent' height='fit-content' header_theme={'transparent'}>
            {page}
        </PrimaryLayout>
    );
};
export default Lifestyle;
