import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import WaitModal from '../components/WaitModal';
import Photo from '../components/Photo';
import Footer from '../components/Footer';
import friendService from '../services/FriendService';
import {firebaseStorage} from '../configs/firebase';
import '../components/Input.css';

const BirthdayInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search} = useLocation();
    const fileInputRef = useRef(null);

    const queryParams = new URLSearchParams(search);
    const friendId = queryParams.get('friendId');

    const {loading} = useSelector((state) => state.loading);
    const {friend} = useSelector((state) => state.friend);

    const [friendImage, setFriendImage] = useState('');
    const [previewFriendImage, setPreviewFriendImage] = useState('');

    const [imageFile, setImageFile] = useState(null);
    const {
        setLoading,
        setFriend,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const fetchFriendData = async () => {
        try {
            const response = await friendService.findById(friendId);
            setFriend(response.data);

            if (
                response.data.imageUrl &&
                response.data.imageUrl.trim().length > 0
            ) {
                setFriendImage(response.data.imageUrl);
            } else {
                setFriendImage(process.env.PUBLIC_URL + '/homer-simpson.png');
            }
        } catch (error) {
            console.error('Error fetching friend data:', error);
        }
    }

    const getBirthdayInfo = () => {
        if (!friend) {
            return;
        }

        const originalDate = new Date(friend.dateOfBirth);
        const day = originalDate.getUTCDate().toString().padStart(2, '0');
        const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = originalDate.getUTCFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        return (
            <div className={'birthday-info'}>
                <Photo
                    src={previewFriendImage || friendImage}
                    alt={'friend-image'}
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
                {previewFriendImage && (
                    <Button
                        text={'Save'}
                        onClick={handleSave}
                    />
                )}
                {friendImage && !previewFriendImage && !friendImage.includes('/homer-simpson.png') && (
                    <Button
                        text={'Delete Image'}
                        onClick={handleDeleteImage}
                    />
                )}
                <div>{friend.firstName} {friend.lastName}</div>
                <div>{friend.email}</div>
                <div>{formattedDate}</div>
            </div>
        );
    }

    const renderBirthdayInfo = () => {
        return (
            <>
                <h1>Birthday Info</h1>
                {getBirthdayInfo()}
                <br/>
                <Button
                    text={'Edit'}
                    onClick={handleEdit}
                />
                <br/>
                <Button
                    text={'Delete'}
                    onClick={handleDelete}
                />
            </>
        );
    }

    const handleDeleteImage = async () => {
        setLoading(true);

        setFriendImage(process.env.PUBLIC_URL + '/homer-simpson.png');

        let oldImage = null;

        if (
            friend.imageUrl &&
            friend.imageUrl.trim().length > 0
        ) {
            oldImage = ref(firebaseStorage, friend.imageUrl);
        }

        const updatedFriend = {
            ...friend,
            imageUrl: "",
        }

        await friendService.update(updatedFriend._id, updatedFriend);

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
            setPreviewFriendImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    }

    const handleSave = async () => {
        setLoading(true);

        if (imageFile) {
            setPreviewFriendImage(null);
        }

        let oldImage = null;

        if (
            friend.imageUrl &&
            friend.imageUrl.trim().length > 0
        ) {
            oldImage = ref(firebaseStorage, friend.imageUrl);
        }

        const imageRef = ref(firebaseStorage, `images/${v4()}-${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        const url = await getDownloadURL(snapshot.ref);

        setFriendImage(url);
        setImageFile(null);

        const updatedFriend = {
            ...friend,
            imageUrl: url,
        }

        await friendService.update(updatedFriend._id, updatedFriend);

        if (oldImage) {
            deleteObject(oldImage).then();
        }

        setLoading(false);
    }

    const handleEdit = () => {
        navigate(`/birthdays/friend/edit?friendId=${friendId}`);
    }

    const handleDelete = async () => {
        await handleDeleteImage();
        friendService.delete(friendId).then(() => navigate(`/birthdays`));
    }

    useEffect(() => {
        setLoading(true);
        fetchFriendData().then(() => setLoading(false));
    }, []);

    return (
        <div className={'container center'}>
            <WaitModal
                show={loading}
            />
            <Header/>
            <main>
                {renderBirthdayInfo()}
            </main>
            <Footer/>
        </div>
    );
}

export default BirthdayInfo;
