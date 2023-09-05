import React, { useState, useEffect } from 'react';
import useAuthRouteGuard from '../hooks/useAuthRouteGuard';
import Header from '../components/Header';

const Main = () => {
    const checkAuth = useAuthRouteGuard();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
        setIsLoading(false);
    }, [checkAuth]);

    return (
        <>
            <Header />
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && <h1>hello friend</h1>}
        </>
    );
};

export default Main;
