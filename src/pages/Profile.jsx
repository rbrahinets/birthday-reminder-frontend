import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {baseUrl} from '../constants';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector((state) => state.isAuthenticated);

    const {setIsAuthenticated} = bindActionCreators(
        actionCreators,
        dispatch
    );

    const renderProfile = () => {
        return (
            <>
                <h1>Profile</h1>
                <Button
                    text={'Sign Out'}
                    onClick={handleSignOut}
                />
            </>
        );
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(!isAuthenticated)
        navigate(`${baseUrl}/`);
    }

    return (
        <center className={'container'}>
            <Header/>
            <main>
                {renderProfile()}
            </main>
            <Footer/>
        </center>
    );
}

export default Profile;
