import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setLoggedIn, setEmail }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear session information
        localStorage.removeItem('user');
        // Update the state to reflect logout
        setLoggedIn(false);
        setEmail('');
        // Redirect to home page after logout
        navigate('/');
    }, [setLoggedIn, setEmail, navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;
    