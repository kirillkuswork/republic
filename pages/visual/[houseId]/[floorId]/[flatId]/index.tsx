import FlatComponent from '../../../../../components/widgets/pages/flat/FlatComponent';
import UniqueHeadLayout from '../../../../../components/layouts/unique-head-layout/UniqueHeadLayout';
import API, { blockId } from '../../../../../constants/API';
import { GetServerSideProps, NextPage } from 'next';
import { IApiCatalogFlat } from '../../../../../store/api/apiTypes';

export const getServerSideProps: GetServerSideProps<{ flat: IApiCatalogFlat }> = async (context) => {
    const res = await fetch(`${API.urlFlat}${context?.params?.flatId}?${blockId}`);
    const data: IApiCatalogFlat = await res.json();

    return {
        props: {
            flat: data,
        },
    };
};

interface IFlat {
    flat: IApiCatalogFlat;
}

interface ILayoutProps {
    children: React.ReactNode;
    flat: IApiCatalogFlat;
}

const withLayout = (Page: NextPage<IFlat>, Layout: React.FC<ILayoutProps>) => {
    return (props: IFlat) => {
        return (
            <Layout flat={props.flat}>
                <Page {...props} />
            </Layout>
        );
    };
};

const Flat: NextPage<IFlat> = ({ flat }) => {
    return <FlatComponent flat={flat} />;
};

export default withLayout(Flat, (props: ILayoutProps) => (
    <UniqueHeadLayout theme={'dark'} header_theme={'dark'} height='fit-content' flat={props.flat}>
        {props.children}
    </UniqueHeadLayout>
));
