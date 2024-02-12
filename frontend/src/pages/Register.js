import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import RegisterDB from "../../../backend/models/RegisterModel";

const Register = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setrepeatPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setrepeatPasswordError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");

    const navigate =  useNavigate();

    const onButtonClick = async () => {
        const api = await fetch('http://localhost:5000/register');
        console.log(api);

        setNameError("")
        setEmailError("")
        setPasswordError("")
        setrepeatPassword("")
        setPhoneNumberError("")


        // Check if the user has entered both fields correctly
        if ("" === name) {
            setNameError("Please enter your Name")
            return
        }

        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === phoneNumber) {
            setPhoneNumberError("Please enter a Phone Number")
            return
        }

        if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber)) {
            setPhoneNumberError("Please enter a valid Phone Number")
            return
        }

        if (phoneNumber.length < 11 && phoneNumber.length >= 11) {
            setPhoneNumberError("Phone Number must be 10 numbers")
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

        if ("" === repeatPassword) {
            setrepeatPasswordError("Please enter a Repeat password")
            return
        }

        if (password != repeatPassword) {
            setrepeatPasswordError("The password and Repeat Password must be same")
            return
        }

        // try {
        //     // Check if the email or phone number already exists in the database
        //     const existingUser = await RegisterDB.findOne({
        //         where: {
        //             $or: [
        //                 { email: email },
        //                 { phoneno: phoneNumber }
        //             ]
        //         }
        //     });

        //     if (existingUser) {
        //         // If email or phone number already exists, show error message
        //         if (existingUser.email === email) {
        //             setEmailError("Email already exists");
        //         }
        //         if (existingUser.phoneno === phoneNumber) {
        //             setPhoneNumberError("Phone number already exists");
        //         }
        //         return; // Do not proceed with registration
        //     }

        //     // Create a new record in the Register table
        //     const newRegistration = await RegisterDB.create({
        //         username: name,
        //         email: email,
        //         password: password,
        //         phoneno: phoneNumber,
        //     });

        //     console.log('Registration successful:', newRegistration);

        //     // Redirect the user to the main page or perform any other action
        //     navigate("/main_page");
        // } catch (error) {
        //     console.error('Error registering user:', error);
        //     // Handle errors appropriately
        // }

    }

    return <div className="mainContainer">
        <div className="card_regis">
        <div className="card_content">
        <div className="titleContainer">
            <div className="card_title">Register</div>
            <div className="underline_title_regis"></div>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={name} placeholder="Enter Your Name Here" onChange={ev => setName(ev.target.value)} className={"inputBox"} />
            <label className="errorLabel">{nameError}</label>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={email} placeholder="Enter Your Email Here" onChange={ev => setEmail(ev.target.value)} className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={phoneNumber} placeholder="Enter Your Phone Number Here" onChange={ev => setPhoneNumber(ev.target.value)} className={"inputBox"} />
            <label className="errorLabel">{phoneNumberError}</label>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={password} placeholder="Enter Your Password Here" onChange={ev => setPassword(ev.target.value)} className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={repeatPassword} placeholder="Repeat The Password Here" onChange={ev => setrepeatPassword(ev.target.value)} className={"inputBox"} />
            <label className="errorLabel">{repeatPasswordError}</label>
        </div>
        <br/>
        <div className="inputContainer">
        <input className={"inputButton"} type="button" onClick={onButtonClick} value={"Register"} />
        </div>
        <div className="inputContainer">
        <a href="/login" id="login">Already have Account</a>
        </div>
        </div>
        </div>
    </div>
}

export default Register