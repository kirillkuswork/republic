import { NextPageWithLayout } from '../page';
import ProgressComponent from '../../components/widgets/pages/progress/ProgressComponent';
import LocomotiveLayout from '../../components/layouts/locomotive/LocomotiveLayout';
import { isMobileOnly } from 'react-device-detect';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';

const Progress: NextPageWithLayout = ({}) => {
    return <ProgressComponent />;
};

export default Progress;

Progress.getLayout = (page) => {
    return (
        <LocomotiveLayout theme='light' header={{ theme: 'light' }} footer={false}>
            {page}
        </LocomotiveLayout>
    );
};
