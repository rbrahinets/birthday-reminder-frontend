import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import Photo from './Photo';
import Button from './Button';
import {actionCreators} from '../state';
import {firebaseStorage} from '../configs/firebase';

const FirebaseImage = ({defaultImageUrl, object, state, service, resetObject}) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);

    const {
        setLoading,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const getImage = () => {
        return (
            <>
                <Photo
                    src={state.previewFirebaseImage || state.firebaseImage}
                    alt={'image'}
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
                {state.firebaseImage && !state.previewFirebaseImage && !state.firebaseImage.includes(defaultImageUrl) && (
                    <Button
                        text={'Delete Image'}
                        onClick={handleDeleteImage}
                    />
                )}
                {state.previewFirebaseImage && (
                    <Button
                        text={'Save'}
                        onClick={handleSave}
                    />
                )}
            </>
        );
    }

    const handleDeleteImage = async () => {
        setLoading(true);
        state.setFirebaseImage(defaultImageUrl);
        await deleteOldImage(object.imageUrl);
        await updateObject('');
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
            state.setPreviewFirebaseImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    }

    const handleSave = async () => {
        setLoading(true);

        if (!imageFile) {
            return;
        }

        const imageRef = ref(firebaseStorage, `images/${v4()}-${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        const url = await getDownloadURL(snapshot.ref);

        setLoading(true);
        state.setPreviewFirebaseImage(null);
        await deleteOldImage(object.imageUrl);
        state.setFirebaseImage(url);
        setImageFile(null);
        await updateObject(url);
        setLoading(false);
    }

    const updateObject = async (url) => {
        const updatedObject = {
            ...object,
            imageUrl: url,
        }

        await service.update(updatedObject._id, updatedObject);
        await resetObject();
    }

    return (
        <>
            {getImage()}
        </>
    );
}

export const deleteOldImage = async (imageUrl) => {
    if (
        imageUrl &&
        imageUrl.trim().length > 0
    ) {
        const oldImage = ref(firebaseStorage, imageUrl);
        await deleteObject(oldImage);
    }
}

export default FirebaseImage;
