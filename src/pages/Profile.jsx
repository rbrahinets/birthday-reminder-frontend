import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import WaitModal from '../components/WaitModal';
import Photo from '../components/Photo';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import {firebaseStorage} from '../configs/firebase';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const {currentUser} = useSelector((state) => state.currentUser);
    const {loading} = useSelector((state) => state.loading);
    const {profileImage} = useSelector((state) => state.profileImage);
    const {previewImage} = useSelector((state) => state.previewImage);

    const [imageFile, setImageFile] = useState(null);

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
            <div className={'profile-info'}>
                <Photo
                    src={previewImage || profileImage}
                    alt={'profile-image'}
                    onClick={handleImageClick}
                />
                <input
                    type={'file'}
                    ref={fileInputRef}
                    accept={'image/*'}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />
                <br/>
                {profileImage && !previewImage && !profileImage.includes('/add.png') && (
                    <Button
                        text={'Delete Image'}
                        onClick={handleDeleteImage}
                    />
                )}
                {previewImage && (
                    <Button
                        text={'Save'}
                        onClick={handleSave}
                    />
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
        setLoading(true);

        setProfileImage(process.env.PUBLIC_URL + '/add.png');

        let oldImage = null;

        if (
            currentUser.imageUrl &&
            currentUser.imageUrl.trim().length > 0
        ) {
            oldImage = ref(firebaseStorage, currentUser.imageUrl);
        }

        const updatedUser = {
            ...currentUser,
            imageUrl: "",
        }

        await userService.update(updatedUser._id, updatedUser);

        if (oldImage) {
            deleteObject(oldImage).then();
        }

        setLoading(false);
    }

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    }

    const handleSave = async () => {
        setLoading(true);

        if (imageFile) {
            setPreviewImage(null);
        }

        let oldImage = null;

        if (
            currentUser.imageUrl &&
            currentUser.imageUrl.trim().length > 0
        ) {
            oldImage = ref(firebaseStorage, currentUser.imageUrl);
        }

        const imageRef = ref(firebaseStorage, `images/${v4()}-${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        const url = await getDownloadURL(snapshot.ref);

        setProfileImage(url);
        setImageFile(null);

        const updatedUser = {
            ...currentUser,
            imageUrl: url,
        }

        await userService.update(updatedUser._id, updatedUser);

        if (oldImage) {
            deleteObject(oldImage).then();
        }

        setLoading(false);
    }

    const handleEdit = () => {
        navigate(`/profile/edit`)
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
            <Header/>
            <main>
                {renderProfile()}
            </main>
            <Footer/>
        </div>
    );
}

export default Profile;
