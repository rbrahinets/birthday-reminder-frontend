import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
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
                <WaitModal
                    show={loading}
                />
                <div className={'birthdays-list'}>
                    {getFriends()}
                    <Link
                        to={`/new-friend`}
                        className={'add-new-birthday'}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/add-new-birthday-${getRandomNumber()}.png`}
                            alt={'add-new-birthday'}
                            className={'add-new-birthday'}
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
            <Header/>
            <main>
                {renderBirthdays()}
            </main>
            <Footer/>
        </div>
    );
}

export default Birthdays;
