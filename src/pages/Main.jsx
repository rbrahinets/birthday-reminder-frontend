import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Authentication from '../components/Authentication';
import './Main.css';

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
                <br/>
                <iframe
                    src={'https://www.youtube.com/embed/Pu58Is_lIIw'}
                    allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
                    allowFullScreen
                    title={'Manual'}>
                </iframe>
                <Authentication/>
            </main>
            <Footer/>
        </div>
    );
}

export default Main;
