import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import ListComponent from '../../components/widgets/pages/list/ListComponent';

const Index: NextPageWithLayout = ({}) => {
    return <ListComponent />;
};

export default Index;

Index.getLayout = (page) => {
    return (
        <PrimaryLayout theme='dark' header_theme='dark' height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
