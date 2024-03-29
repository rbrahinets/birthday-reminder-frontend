import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {baseUrl} from '../constants';
import friendService from '../services/FriendService';
import './Birthdays.css';

const Birthdays = () => {
    const dispatch = useDispatch();

    const {friends} = useSelector((state) => state.friends);
    const {loading} = useSelector((state) => state.loading);

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
                                to={`${baseUrl}/birthdays/friend?friendId=${friend._id}`}
                                className={'birthday-link'}
                            >
                                <img
                                    src={process.env.PUBLIC_URL + '/homer-simpson.png'}
                                    alt={'birthday'}
                                    className={'birthday-image'}
                                />
                                {friend.firstName} {friend.lastName}
                            </Link>
                        </div>
                    )
                )}
            </>
        )
    }

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 4) + 1;
    }

    const renderBirthdays = () => {
        return (
            <>
                <h1>Birthdays</h1>
                {loading && <div>Loading...</div>}
                {!loading &&
                    <div className={'birthdays-list'}>
                        {getFriends()}
                        <Link
                            to={`${baseUrl}/new-friend`}
                            className={'add-new-birthday'}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/add-new-birthday-${(getRandomNumber())}.png`}
                                alt={'add-new-birthday'}
                                className={'add-new-birthday'}
                            />
                        </Link>
                    </div>
                }
            </>
        );
    }

    useEffect(() => {
        setLoading(true);

        const fetchFriendsData = async (email) => {
            try {
                const response = await friendService.getFriendsForUserByEmail(email);
                setFriends(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching friends data:', error);
            }
        }

        fetchFriendsData(localStorage.getItem('currentUserEmail'));
    }, []);

    return (
        <center className={'container'}>
            <Header/>
            <main>
                {renderBirthdays()}
            </main>
            <Footer/>
        </center>
    );
}

export default Birthdays;
