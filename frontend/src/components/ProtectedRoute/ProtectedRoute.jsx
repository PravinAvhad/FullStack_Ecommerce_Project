import React from 'react'
import {Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Loader from '../Layout/Loader/Loader';

const ProtectedRoute = ({isAdmin, component: Component, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.User);

    if (loading) {
        return <Loader/>; // Show a loading indicator while fetching the user data
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAdmin && user.user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;