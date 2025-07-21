import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
const PrivateRoute = ({ children }) => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return <Navigate to="/login" replace />;
    // }
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return children;
};
export default PrivateRoute;
