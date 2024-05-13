import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/navbar/commonHeader";
import jwtDecode from "jwt-decode";


const MainPage = (props) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // const checkTokenExpiration = () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         const currentTime = Date.now() / 1000; // Convert to seconds

    //         if (decodedToken.exp < currentTime) {
    //             // Token is expired, log out user or handle accordingly
    //             setIsAuthenticated(false);
    //             localStorage.removeItem('token'); // Remove expired token
    //             navigate('/login'); // Redirect user to login page
    //         }
    //     }
    // };

    useEffect(() => {
        // Retrieve session data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true); // Set isAuthenticated to true if user exists
        }

       // checkTokenExpiration();

        // Retrieve user details from token
        //const token = localStorage.getItem('token');
    //     if (token) {
    //        // const decodedToken = jwtDecode(token);
    //         setUser(token); // Set user details
    //         setIsAuthenticated(true); // Set authentication status
    //     }

    
     }, []);

    const setLoggedIn = (value) => {
        setIsAuthenticated(value);
    };

    const setEmail = (email) => {
        setIsAuthenticated(user.email);
    };

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <Header isAuthenticated={isAuthenticated} setLoggedIn={setLoggedIn} setEmail={setEmail} />
                    <div className="mainContainer">
                    <div className={"titlecontainer"}>
                    <h1>Welcome {user.name}!</h1>
                        {/* <h1>Welcome {user.name}!</h1> */}
                        <div>This is the Main page!</div>
                    </div>
                    </div>
                </>
            ) : (
                <div>
                    <Header isAuthenticated={isAuthenticated} />
                    <h1>Please log in to access this page</h1>
                </div>
                
            )}
        </div>
    );
};

export default MainPage;
