import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Birthdays = () => {
    const renderBirthdays = () => {
        return (
            <>
                <h1>Birthdays</h1>
            </>
        );
    }

    return (
        <center className={'container'}>
            <Header/>
            <main>
                {renderBirthdays()}
            </main>
            <Footer/>
        </center>
    );
}

export default Birthdays;
