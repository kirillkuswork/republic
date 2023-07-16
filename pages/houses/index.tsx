import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import HousesComponent from '../../components/widgets/pages/houses/HousesComponent';

const Houses: NextPageWithLayout = ({}) => {
    return (
        <>
            <HousesComponent />
        </>
    );
};

export default Houses;

Houses.getLayout = (page) => {
    return (
        <PrimaryLayout theme='dark' height='one-screen' header_theme={'dark'}>
            {page}
        </PrimaryLayout>
    );
};
