import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/navbar/commonHeader";

const Home = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            console.log(email)
        } else {
            navigate("/login");
            console.log('email')
        }
    };

    return (
        <div>
            <Header isAuthenticated={loggedIn} />
            <div className="mainContainer">
                <div className="titlecontainer">
                    <div>Welcome!</div>
                </div>

                <div>This is the home page!</div>

                <div className="buttonContainer">
                    <input className="inputButton" type="button" onClick={onButtonClick} value={loggedIn ? "Logout" : "Login"} />
                    {loggedIn && <div>Your Email Address is {email}</div>}
                </div>
            </div>
        </div>
    );
};

export default Home;
