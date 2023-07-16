import DefaultHead from '../../components/shared/head/DefaultHead';
import HistoryComponent from '../../components/widgets/pages/history/HistoryComponent';
import { useEffect, useState } from 'react';

const History = () => {
    const [client, setClient] = useState(false);

    //Рендер только на стороне клиента
    useEffect(() => {
        setClient(true);
    }, []);

    return (
        <>
            <DefaultHead />
            {client && <HistoryComponent />}
        </>
    );
};

export default History;
