import { useNavigate } from 'react-router-dom';

const useAuthRouteGuard = () => {
    const navigate = useNavigate();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/sign-in');
        }
    };

    return checkAuth;
};

export default useAuthRouteGuard;
