import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {baseUrl} from '../constants';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import friendService from '../services/FriendService';
import './BirthdayInfo.css';

const BirthdayInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const friendId = queryParams.get('friendId');

    const {loading} = useSelector((state) => state.loading);
    const {friend} = useSelector((state) => state.friend);

    const {
        setLoading,
        setFriend,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const setInfoAboutFriend = async () => {
        try {
            const response = await friendService.findById(friendId);
            setFriend(response.data);
        } catch (error) {
            console.error('Error fetching friend data:', error);
        }
    }

    const getBirthdayInfo = () => {
        if (loading || !friend) {
            return <div>Loading...</div>;
        }

        const originalDate = new Date(friend.dateOfBirth);
        const day = originalDate.getUTCDate().toString().padStart(2, '0');
        const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = originalDate.getUTCFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        return (
            <div className={'birthday-info'}>
                <img
                    src={process.env.PUBLIC_URL + '/add-profile-image.png'}
                    alt={'add-profile'}
                    className={'add-profile-image'}
                />
                <div>{friend.firstName} {friend.lastName}</div>
                <div>{friend.email}</div>
                <div>{formattedDate}</div>
            </div>
        )
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
        navigate(`${baseUrl}/birthdays/friend/edit?friendId=${friendId}`);
    }

    const handleDelete = () => {
        friendService.delete(friendId).then(() => navigate(`${baseUrl}/birthdays`));
    }

    useEffect(() => {
        setLoading(true);
        setInfoAboutFriend().then(() => setLoading(false));
    }, []);

    return (
        <center className={'container'}>
            <Header/>
            <main>
                {renderBirthdayInfo()}
            </main>
            <Footer/>
        </center>
    );
}

export default BirthdayInfo;
