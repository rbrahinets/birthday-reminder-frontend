import React, { useState, useEffect } from 'react';
import useAuthRouteGuard from '../hooks/useAuthRouteGuard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Main = () => {
    const checkAuth = useAuthRouteGuard();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
        setIsLoading(false);
    }, [checkAuth]);

    return (
        <>
            <center>
                <Header />
                {isLoading && <h1>Loading...</h1>}
                {!isLoading && <h1>hello friend</h1>}
                <Footer className={'footer'} />
            </center>
        </>
    );
};

export default Main;
