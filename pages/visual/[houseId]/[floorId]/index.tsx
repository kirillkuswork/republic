import { NextPageWithLayout } from '../../../page';
import FloorComponent from '../../../../components/widgets/pages/visual/floor/FloorComponent';
import PrimaryLayout from '../../../../components/layouts/primary/PrimaryLayout';

const Floor: NextPageWithLayout = () => {
    return <FloorComponent />;
};
export default Floor;

Floor.getLayout = (page) => {
    return (
        <PrimaryLayout theme={'dark'} header_theme={'dark'} height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
