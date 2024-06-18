import React, { useEffect } from 'react';
import { Loading } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import authProvider from './firebaseAuthProvider'; // Path to your authProvider

export const AuthRouteProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        authProvider.checkAuth()
            .then(() => {
                // User is already authenticated, redirect to '/admin'
                navigate('/admin');
            })
            .catch(() => {
                // User is not authenticated, allow rendering children
                setLoading(false);
            });
    }, [navigate]);

    if (loading) return <Loading />;

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};
