import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {baseUrl} from '../constants';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {currentUser} = useSelector((state) => state.currentUser);
    const {loading} = useSelector((state) => state.loading);

    const {
        setIsAuthenticated,
        setCurrentUser,
        setLoading,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const setInfoAboutCurrentUser = async () => {
        try {
            const response = await userService.findByEmail(
                localStorage.getItem('currentUserEmail')
            );
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Error fetching current user data:', error);
        }
    }

    const getProfileInfo = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div className={'profile-info'}>
                <img
                    src={process.env.PUBLIC_URL + '/add-profile-image.png'}
                    alt={'add-profile'}
                    className={'add-profile-image'}
                />
                <div>{currentUser.firstName} {currentUser.lastName}</div>
                <div>{currentUser.email}</div>
            </div>
        )
    }

    const renderProfile = () => {
        return (
            <>
                <h1>Profile</h1>
                {getProfileInfo()}
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
        localStorage.removeItem('currentUserEmail');
        setIsAuthenticated(false);
        navigate(`${baseUrl}/`);
    }

    useEffect(() => {
        setLoading(true);
        setInfoAboutCurrentUser().then(() => setLoading(false));
    }, []);

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
