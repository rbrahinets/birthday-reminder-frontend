import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Photo from '../components/Photo';
import WaitModal from '../components/WaitModal';
import Footer from '../components/Footer';
import friendService from '../services/FriendService';
import './Birthdays.css';

const Birthdays = () => {
    const dispatch = useDispatch();

    const {loading} = useSelector((state) => state.loading);
    const {friends} = useSelector((state) => state.friends);

    const {
        setFriends,
        setLoading,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const getFriends = () => {
        return (
            <>
                {friends.map((friend) => (
                        <div key={friend._id}>
                            <Link
                                to={`/birthdays/friend?friendId=${friend._id}`}
                                className={'birthday-link'}
                            >
                                <Photo
                                    src={getSourceOfPhoto(friend.imageUrl)}
                                    alt={'birthday'}
                                />
                                {friend.firstName} {friend.lastName}
                            </Link>
                        </div>
                    )
                )}
            </>
        )
    }

    const getSourceOfPhoto = (url) => {
        if (url && url.length > 0) {
            return url;
        }

        return process.env.PUBLIC_URL + '/homer-simpson.png';
    }

    const renderBirthdays = () => {
        return (
            <>
                <h1>Birthdays</h1>
                <div className={'birthdays-list'}>
                    {getFriends()}
                    <Link
                        to={`/new-friend`}
                        className={'add-new-birthday'}
                    >
                        <Photo
                            src={`${process.env.PUBLIC_URL}/add.png`}
                            alt={'add-new-birthday'}
                        />
                    </Link>
                </div>
            </>
        );
    }

    const fetchFriendsData = async (email) => {
        try {
            const response = await friendService.getFriendsForUserByEmail(email);
            setFriends(response.data);
        } catch (error) {
            console.error('Error fetching friends data:', error);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchFriendsData(localStorage.getItem('currentUserEmail')).then(() => setLoading(false));
    }, []);

    return (
        <div className={'container center'}>
            <WaitModal
                show={loading}
            />
            <Header/>
            <main>
                {renderBirthdays()}
            </main>
            <Footer/>
        </div>
    );
}

export default Birthdays;
