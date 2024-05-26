import React, {useEffect} from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {VscSignOut} from 'react-icons/vsc';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import WaitModal from '../components/WaitModal';
import FirebaseImage from '../components/FirebaseImage';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import './../components/Button.css';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {currentUser} = useSelector((state) => state.currentUser);
    const {loading} = useSelector((state) => state.loading);
    const {profileImage} = useSelector((state) => state.profileImage);
    const {previewProfileImage} = useSelector((state) => state.previewProfileImage);

    const {
        setIsAuthenticated,
        setCurrentUser,
        setLoading,
        setProfileImage,
        setPreviewProfileImage,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const fetchCurrentUserData = async () => {
        try {
            const response = await userService.findByEmail(
                localStorage.getItem('currentUserEmail')
            );
            setCurrentUser(response.data);

            if (
                response.data.imageUrl &&
                response.data.imageUrl.trim().length > 0
            ) {
                setProfileImage(response.data.imageUrl);
            } else {
                setProfileImage(process.env.PUBLIC_URL + '/add.png');
            }
        } catch (error) {
            console.error('Error fetching current user data:', error);
        }
    }

    const getProfileInfo = () => {
        return (
            <div className={'info-container'}>
                <FirebaseImage
                    defaultImageUrl={`${process.env.PUBLIC_URL}/add.png`}
                    object={currentUser}
                    state={{
                        firebaseImage: profileImage,
                        previewFirebaseImage: previewProfileImage,
                        setFirebaseImage: setProfileImage,
                        setPreviewFirebaseImage: setPreviewProfileImage,
                    }}
                    service={userService}
                    resetObject={fetchCurrentUserData}
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
                <Button
                    text={'Edit'}
                    onClick={handleEdit}
                    IconTag={FaRegEdit}
                    sizeIcon={25}
                />
                <hr/>
                <Button
                    text={'Sign Out'}
                    onClick={handleSignOut}
                    IconTag={VscSignOut}
                    sizeIcon={35}
                />
            </>
        );
    }

    const handleEdit = () => {
        navigate(`/profile/edit`);
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserEmail');
        setIsAuthenticated(false);
        navigate(`/`);
    }

    useEffect(() => {
        setLoading(true);
        fetchCurrentUserData().then(() => setLoading(false));
    }, []);

    return (
        <div className={'container center'}>
            <WaitModal
                show={loading}
            />
            <Header/>
            <main>
                {renderProfile()}
            </main>
            <Footer/>
        </div>
    );
}

export default Profile;
