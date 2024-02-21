import { Navigate } from 'react-router-dom';
import {useStore} from "../store/useStore";

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
    const isLoggedIn =  useStore((state) => state.isLogined);
    return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};