import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {MdDelete} from 'react-icons/md';
import {TfiSave} from 'react-icons/tfi';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import Button from './Button';
import Photo from './Photo';
import {actionCreators} from '../state';
import {firebaseStorage} from '../configs/firebase';
import './FirebaseImage.css';

const FirebaseImage = ({defaultImageUrl, object, state, service, resetObject}) => {
  const dispatch = useDispatch();
  const location = useLocation();
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
        <div className={'photo-container'}>
          <Photo
            src={state.previewFirebaseImage || state.firebaseImage}
            alt={'image'}
            onClick={handleImageClick}
          />
          {state.firebaseImage && !state.previewFirebaseImage && !state.firebaseImage.includes(defaultImageUrl) && (
            <MdDelete
              className={'button-delete'}
              size={20}
              onClick={handleDeleteImage}
            />
          )}
        </div>
        <input
          type={'file'}
          ref={fileInputRef}
          accept={'image/*'}
          className={'invisible'}
          onChange={handleFileChange}
        />
        <br/>
        {state.previewFirebaseImage && (
          <>
            <Button
              text={'Save'}
              onClick={handleSave}
              IconTag={TfiSave}
            />
            <br/>
            <Button
              text={'Cancel'}
              onClick={handleCancel}
            />
          </>
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

  const handleCancel = async () => {
    state.setPreviewFirebaseImage(null);
  }

  useEffect(() => {
    state.setPreviewFirebaseImage(null);
  }, [location]);

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
