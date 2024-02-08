import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Authentication from '../components/Authentication';
import Footer from '../components/Footer';

const Main = () => {
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector((state) => state.isAuthenticated);

    const {
        setIsVisibleSignInModal,
        setIsVisibleSignUpModal,
        setIsAuthenticated,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const renderMainForUnauthenticatedUser = () => {
        return (
            <>
                <img
                    src={process.env.PUBLIC_URL + '/main_unauthenticated.png'}
                    alt={'main-unauthenticated'}
                    className={'main-unauthenticated'}
                    useMap="#image-map"
                />
                <map name="image-map">
                    <area
                        shape="rect"
                        coords="39,366,126,398"
                        alt="Sign In"
                        onClick={() => setIsVisibleSignInModal(true)}
                    />
                    <area
                        shape="rect"
                        coords="999,462,1091,497"
                        alt="Sign Up"
                        onClick={() => setIsVisibleSignUpModal(true)}
                    />
                </map>
                <Authentication/>
            </>
        );
    }

    const renderMainForAuthenticatedUser = () => {
        return (
            <>
                <img
                    src={process.env.PUBLIC_URL + '/main_authenticated.png'}
                    alt={'main-authenticated'}
                    className={'main-authenticated'}
                />
            </>
        );
    }

    const calculateRelativeCoordinates = (x1, y1, x2, y2, screenWidth, screenHeight, imageWidth, imageHeight) => {
        const relativeX1 = (x1 / imageWidth) * 100;
        const relativeY1 = (y1 / imageHeight) * 100;
        const relativeX2 = (x2 / imageWidth) * 100;
        const relativeY2 = (y2 / imageHeight) * 100;

        return [relativeX1, relativeY1, relativeX2, relativeY2];
    }

    useEffect(() => {
        const image = document.querySelector('.main-unauthenticated');

        if (!image) {
            return;
        }

        const imageWidth = image.width;
        const imageHeight = image.height;

        const signInArea = document.querySelector('#sign-in-area');
        const signUpArea = document.querySelector('#sign-up-area');

        const updateCoordinates = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const signInCoords = calculateRelativeCoordinates(
                39, 366, 126, 398,
                screenWidth, screenHeight, imageWidth, imageHeight
            );
            const signUpCoords = calculateRelativeCoordinates(
                999, 462, 1091, 497,
                screenWidth, screenHeight, imageWidth, imageHeight
            );

            signInArea.coords = signInCoords.join(',');
            signUpArea.coords = signUpCoords.join(',');

            updateCoordinates();
            window.addEventListener('resize', updateCoordinates);

            return () => {
                window.removeEventListener('resize', updateCoordinates);
            };
        };
    }, []);

    return (
        <center className={'container'}>
            <Header/>
            <main>
                {
                    isAuthenticated
                        ? renderMainForAuthenticatedUser()
                        : renderMainForUnauthenticatedUser()
                }
            </main>
            <Footer/>
        </center>
    );
}

export default Main;
