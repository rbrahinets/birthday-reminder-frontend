import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {baseUrl} from '../constants';
import friendService from '../services/FriendService';

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
        if (loading) {
            return <div>Loading...</div>;
        }

        return friends.length > 0 ? (
            <div>
                {friends.map((friend) => (
                    <div key={friend._id}>
                        <Link
                            to={`${baseUrl}/birthdays/friend?friendId=${friend._id}`}
                        >
                            {friend.firstName} {friend.lastName}
                        </Link>
                    </div>
                ))}
            </div>
        ) : (
            <div>No Friends Found</div>
        )
    }

    const renderBirthdays = () => {
        return (
            <>
                <h1>Birthdays</h1>
                {getFriends()}
                <hr/>
                <Link
                    to={`${baseUrl}/new-friend`}
                >
                    Add New Friend
                </Link>
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
