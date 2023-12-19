import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Main = () => {
    return (
        <center className={'content'}>
            <Header/>
            <main>
                <h1>hello friend</h1>
            </main>
            <Footer className={'footer'}/>
        </center>
    );
}

export default Main;
