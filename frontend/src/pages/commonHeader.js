import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Header = ({ isAuthenticated, setLoggedIn, setEmail }) => {
    const navigate = useNavigate();
    //const { loggedIn, email } = props;

    // Function to handle logout
    const handleLogout = () => {
  
        navigate('/logout');
    };

    return (
        <header>
            <nav>
                <div className="menu-container"> {/* Apply styling to create a horizontal menu */}
                    <div className="menu-item">
                        <Link to="/"><span id="menu_title">Home</span>
                            <FaHome />
                        </Link>
                    </div>
                    {!isAuthenticated ? (
                        <>
                            <div className="menu-item">
                                <Link to="/login"><span id="menu_title">Login</span>
                                    <FaSignInAlt />
                                </Link>
                            </div>
                            <div className="menu-item">
                                <Link to="/register"><span id="menu_title">Register</span>
                                    <FaUserPlus />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="menu-item">
                                <Link to="/profile">
                                    <FaUser />
                                </Link>
                            </div>
                            <div className="menu-item">
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
