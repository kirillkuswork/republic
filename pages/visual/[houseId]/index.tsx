import PrimaryLayout from '../../../components/layouts/primary/PrimaryLayout';
import BulkComponent from '../../../components/widgets/pages/visual/bulk/BulkComponent';
import { NextPageWithLayout } from '../../page';

const Bulk: NextPageWithLayout = () => {
    return <BulkComponent />;
};
export default Bulk;

Bulk.getLayout = (page) => {
    return (
        <PrimaryLayout theme={'dark'} header_theme={'dark'} height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
