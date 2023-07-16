import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import LocationComponent from '../../components/widgets/pages/location/LocationComponent';

const Location: NextPageWithLayout = () => {
    return <LocationComponent />;
};

export default Location;

Location.getLayout = (page) => {
    return (
        <PrimaryLayout theme='transparent' header_theme='transparent' height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
