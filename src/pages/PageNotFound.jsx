import React from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../constants';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleMainClick = () => {
        navigate(`${baseUrl}/`);
    }

    return (
        <center className={'container'}>
            <Header/>
            <main>
                <h1>Oops...</h1>
                <h2>Page Not Found</h2>
                <Button text={'Main'} onClick={handleMainClick}/>
            </main>
            <Footer/>
        </center>
    );
}

export default PageNotFound;
