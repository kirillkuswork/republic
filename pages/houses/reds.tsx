import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import RedsComponent from '../../components/widgets/pages/house-reds/RedsComponent';

const Reds: NextPageWithLayout = ({}) => {
    return <RedsComponent />;
};

export default Reds;

Reds.getLayout = (page) => {
    return (
        <PrimaryLayout theme='transparent' height='fit-content' header_theme={'transparent'}>
            {page}
        </PrimaryLayout>
    );
};
