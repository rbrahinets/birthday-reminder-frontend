import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Authentication from '../components/Authentication';

const Main = () => {
    return (
        <div className={'container center'}>
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
        </div>
    );
}

export default Main;
