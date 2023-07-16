import { NextPageWithLayout } from '../page';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import ContactsComponent from '../../components/widgets/pages/contacts/ContactsComponent';

const Contacts: NextPageWithLayout = () => {
    return <ContactsComponent />;
};

export default Contacts;

Contacts.getLayout = (page) => {
    return (
        <PrimaryLayout theme='light' header_theme='light' height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
