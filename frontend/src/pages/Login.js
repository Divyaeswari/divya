import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate =  useNavigate();

    const onButtonClick = () => {


        setEmailError("")
        setPasswordError("")


        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

    }

    return <div className="mainContainer">
        <div className="card">
        <div className="card_content">
        <div className="titleContainer">
            <div className="card_title">Login</div>
            <div className="underline_title"></div>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={email} placeholder="Enter Your Email Here" onChange={ev => setEmail(ev.target.value)} className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={password} placeholder="Enter Your Password Here" onChange={ev => setPassword(ev.target.value)} className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br/>
        <div className="inputContainer">
        <input className={"inputButton"} type="button" onClick={onButtonClick} value={"Login"} />
        </div>
        <div className="inputContainer">
        <a href="/register" id="signup">Don't have account yet?</a>
        </div>
        </div>
        </div>
    </div>
}

export default Login