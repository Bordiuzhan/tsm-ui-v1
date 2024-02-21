import {Navigate, useLocation} from 'react-router-dom';
import {useStore} from "../store/useStore";

export const PrivateRoute = ({component: Component, redirectTo = '/'}) => {
    const location = useLocation()
    const isLoggedIn = useStore((state) => state.isLogined);
    const shouldRedirect = !isLoggedIn && true
    return shouldRedirect ? <Navigate to={redirectTo} state={{from: location}}/> : Component;
};