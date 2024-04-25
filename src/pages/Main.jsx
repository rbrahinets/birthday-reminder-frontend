import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Authentication from '../components/Authentication';
import './Main.css';

const Main = () => {
    return (
        <center className={'container'}>
            <Header/>
            <main>
                <img
                    src={process.env.PUBLIC_URL + '/main_image.png'}
                    alt={'main-image'}
                    className={'main-image'}
                />
                <Authentication/>
            </main>
            <Footer/>
        </center>
    );
}

export default Main;
