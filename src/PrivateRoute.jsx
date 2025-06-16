import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './context/Auth/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="max-w-5xl mx-auto py-10 px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your courses...</p>
        </div>;
    }

    if (user && user.email) {
        return children;
    }

    return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
