import ErrorComponent from '../components/widgets/pages/error/error-component/ErrorComponent';
import Message404 from '../components/widgets/pages/error/message-404/Message404';

const Error = () => {
    return <ErrorComponent head={'404 - страница не найдена'} title1={'Страница'} title2={'не найдена'} children={<Message404 />} />;
};

export default Error;
