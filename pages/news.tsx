import { NextPageWithLayout } from './page';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import NewsComponent from '../components/widgets/pages/news/NewsComponent';

const News: NextPageWithLayout = () => {
    return (
        <>
            <NewsComponent />
        </>
    );
};

export default News;

News.getLayout = (page) => {
    return (
        <PrimaryLayout theme='light' header_theme='light' height='fit-content'>
            {page}
        </PrimaryLayout>
    );
};
