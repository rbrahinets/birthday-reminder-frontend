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

    const {setFriends} = bindActionCreators(
        actionCreators,
        dispatch
    );

    const getFriends = () => {
        return friends.length > 0 ? (
            <div>
                {friends.map((friend) => (
                    <div key={friend._id}>
                        {friend.firstName} {friend.lastName}
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
        const fetchFriendsData = async (email) => {
            try {
                const response = await friendService.getFriendsForUserByEmail(email);
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends data:', error);
            }
        };

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
