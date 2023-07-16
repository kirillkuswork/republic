import React, { useEffect, useState } from 'react';
import MainPageComponent from '../components/widgets/pages/main-page/MainPageComponent';
import DefaultHead from '../components/shared/head/DefaultHead';

const Home = () => {
    const [client, setClient] = useState(false);

    //Рендер только на стороне клиента
    useEffect(() => {
        setClient(true);
    }, []);
    return (
        <>
            <DefaultHead />
            {client && <MainPageComponent />}
        </>
    );
};

export default Home;
