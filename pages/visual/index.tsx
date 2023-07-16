import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import VisualComponent from '../../components/widgets/pages/visual/VisualComponent';

const Visual: NextPageWithLayout = () => {
    return <VisualComponent />;
};
export default Visual;

Visual.getLayout = (page) => {
    return (
        <PrimaryLayout theme={'dark'} header_theme={'dark'} height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
