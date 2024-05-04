import React, {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {baseUrl} from '../constants';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import {convertToBase64} from '../hooks/useConverter';
import imageService from '../services/ImageService';
import userService from '../services/UserService';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {currentUser} = useSelector((state) => state.currentUser);
    const {loading} = useSelector((state) => state.loading);
    const {profileImage} = useSelector((state) => state.profileImage);
    const {previewImage} = useSelector((state) => state.previewImage);

    const fileInputRef = useRef(null);

    const {
        setIsAuthenticated,
        setCurrentUser,
        setLoading,
        setProfileImage,
        setPreviewImage,
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

            if (
                response.data.imageId &&
                response.data.imageId.trim().length >= 0
            ) {
                const imageData = (await imageService.findById(response.data.imageId)).data;
                setProfileImage(imageData.data);
            } else {
                setProfileImage(process.env.PUBLIC_URL + '/add-profile-image.png');
            }
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
                    src={previewImage || profileImage}
                    alt={'add-profile-image'}
                    className={'add-profile-image'}
                    onClick={handlePhotoClick}
                />
                <input
                    type={'file'}
                    ref={fileInputRef}
                    accept={'image/*'}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />
                <br/>
                {profileImage && !profileImage.includes('/add-profile-image.png') && !previewImage && (
                    <button onClick={handleDeleteImage}>Delete Image</button>
                )}
                {previewImage && (
                    <button onClick={handleSave}>Save</button>
                )}
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

    const handleDeleteImage = async () => {
        setProfileImage(process.env.PUBLIC_URL + '/add-profile-image.png');

        const updatedUser = {
            ...currentUser,
            imageId: "",
        }

        await userService.update(updatedUser._id, updatedUser);

        if (currentUser.imageId) {
            await imageService.delete(currentUser.imageId);
        }
    }

    const handlePhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setProfileImage(await convertToBase64(file));
        }
    }

    const handleSave = async () => {
        if (profileImage) {
            setPreviewImage(null);
        }

        const image = {data: profileImage};
        const imageData = (await imageService.save(image)).data;
        const updatedUser = {
            ...currentUser,
            imageId: imageData.id,
        }

        await userService.update(updatedUser._id, updatedUser);

        if (currentUser.imageId) {
            await imageService.delete(currentUser.imageId);
        }
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
