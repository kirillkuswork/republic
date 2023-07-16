import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import PlatinumComponent from '../../components/widgets/pages/house-platinum/PlatinumComponent';

const Platinum: NextPageWithLayout = ({}) => {
    return (
        <>
            <PlatinumComponent />
        </>
    );
};

export default Platinum;

Platinum.getLayout = (page) => {
    return (
        <PrimaryLayout theme='transparent' height='fit-content' header_theme={'transparent'}>
            {page}
        </PrimaryLayout>
    );
};
