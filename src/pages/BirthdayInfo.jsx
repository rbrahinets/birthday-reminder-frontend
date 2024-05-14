import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import WaitModal from '../components/WaitModal';
import FirebaseImage, {deleteOldImage} from '../components/FirebaseImage';
import Footer from '../components/Footer';
import birthdayService from '../services/BirthdayService';
import '../components/Input.css';

const BirthdayInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search} = useLocation();

    const queryParams = new URLSearchParams(search);
    const birthdayId = queryParams.get('birthdayId');

    const {loading} = useSelector((state) => state.loading);
    const {birthday} = useSelector((state) => state.birthday);
    const {birthdayImage} = useSelector((state) => state.birthdayImage);
    const {previewBirthdayImage} = useSelector((state) => state.previewBirthdayImage);

    const {
        setLoading,
        setBirthday,
        setBirthdayImage,
        setPreviewBirthdayImage,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const fetchBirthdayData = async () => {
        try {
            const response = await birthdayService.findById(birthdayId);
            setBirthday(response.data);

            if (
                response.data.imageUrl &&
                response.data.imageUrl.trim().length > 0
            ) {
                setBirthdayImage(response.data.imageUrl);
            } else {
                setBirthdayImage(process.env.PUBLIC_URL + '/homer-simpson.png');
            }
        } catch (error) {
            console.error('Error fetching birthday data:', error);
        }
    }

    const getBirthdayInfo = () => {
        if (!birthday) {
            return;
        }

        const originalDate = new Date(birthday.dateOfBirth);
        const day = originalDate.getUTCDate().toString().padStart(2, '0');
        const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = originalDate.getUTCFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        return (
            <div className={'birthday-info'}>
                <FirebaseImage
                    defaultImageUrl={`${process.env.PUBLIC_URL}/homer-simpson.png`}
                    object={birthday}
                    state={{
                        firebaseImage: birthdayImage,
                        previewFirebaseImage: previewBirthdayImage,
                        setFirebaseImage: setBirthdayImage,
                        setPreviewFirebaseImage: setPreviewBirthdayImage,
                    }}
                    service={birthdayService}
                    resetObject={fetchBirthdayData}
                />
                <div>{birthday.firstName} {birthday.lastName}</div>
                <div>{birthday.email}</div>
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

    const handleEdit = () => {
        navigate(`/birthdays/birthday/edit?birthdayId=${birthdayId}`);
    }

    const handleDelete = () => {
        deleteBirthday().then(() => navigate(`/birthdays`));
    }

    const deleteBirthday = async () => {
        await deleteOldImage(birthday.imageUrl);
        await birthdayService.delete(birthdayId);
    }

    useEffect(() => {
        setLoading(true);
        fetchBirthdayData().then(() => setLoading(false));
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
