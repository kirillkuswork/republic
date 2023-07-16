import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import DocumentsComponent from '../../components/widgets/pages/documents/DocumentsComponent';

const Documents: NextPageWithLayout = () => {
    return <DocumentsComponent />;
};

export default Documents;

Documents.getLayout = (page) => {
    return (
        <PrimaryLayout theme='light' header_theme='light' height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
