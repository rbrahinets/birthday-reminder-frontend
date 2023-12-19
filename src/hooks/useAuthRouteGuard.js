import { useNavigate } from 'react-router-dom';

const url = '/birthday-reminder-frontend';

const useAuthRouteGuard = () => {
    const navigate = useNavigate();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate(`${url}/sign-in`);
        }
    }

    return checkAuth;
}

export default useAuthRouteGuard;
