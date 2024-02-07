import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {baseUrl} from '../constants';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import userService from '../services/UserService';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector((state) => state.isAuthenticated);
    const {currentUser} = useSelector((state) => state.currentUser);

    const {
        setIsAuthenticated,
        setCurrentUser
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const setInfoAboutCurrentUser = async () => {
        const response = await userService.findByEmail(localStorage.getItem('currentUserEmail'));
        setCurrentUser(response.data);
    }

    const renderProfile = () => {
        setInfoAboutCurrentUser().then();

        return (
            <>
                <h1>Profile</h1>
                <div className={'profile-info'}>
                    <div>{currentUser.firstName} {currentUser.lastName}</div>
                    <div>{currentUser.email}</div>
                </div>
                <br/>
                <Button
                    text={'Edit'}
                    onClick={handleEdit}
                />
                <hr/>
                <Button
                    text={'Sign Out'}
                    onClick={handleSignOut}
                />
            </>
        );
    }

    const handleEdit = () => {
        navigate(`${baseUrl}/profile/edit`)
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
