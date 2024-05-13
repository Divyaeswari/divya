import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from "../components/navbar/commonHeader";
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    //const [selectedImage, setSelectedImage] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [DOBError, setDOBError] = useState("");
    const navigate =  useNavigate();
    const isAuthenticated = false;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const handleDateOfBirthChange = (event) => {
        // Handle date of birth selection
        setDateOfBirth(event.target.value);
    };

    const onButtonClick = async () => {
        // const api = await fetch('http://localhost:5000/register',{ method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',}});
        // console.log(api);

        setNameError("")
        setEmailError("")
        setPhoneNumberError("")
        setPasswordError("")
        setrepeatPassword("")
        setDOBError(")")


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

        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            setDOBError('You must be at least 18 years old to register.');
            return;
        }


        

            const userData = {
                username: name,
                email: email,
                password: password,
                phoneno: phoneNumber,
                dateOfBirth: dateOfBirth,
                role: 'user'
            };  
        
            try {
                const response = await fetch('http://localhost:5000/registerUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
        
                if (response.ok) {
                    if(response.status == 200)
                    {
                
                    withReactContent(Swal).fire({
                        title: 'Success!',
                        text: 'Registration successfully Done!',           
                      }).then(function() {
                            navigate("/login");
                      });
                    }else if(response.status == 500)
                    {
                        withReactContent(Swal).fire({
                            title: 'Error!',
                            text: 'Internal server error.',           
                          }).then(function() {
                                navigate("/home");
                          });
                    }
                } else {
                    // Handle error response
                    const data = await response.json();
                    console.error('Registration failed:', data.error);

                    withReactContent(Swal).fire({
                        title: 'Error!',
                        text: 'Registration failed.',           
                      }).then(function() {
                            navigate("/register");
                      });
                }
            } catch (error) {
                console.error('Error registering user:', error);
                // Handle network errors or other issues
            }

    };

    return (
        <div>
        <Header isAuthenticated={isAuthenticated} />
        <div className="mainContainer">
        <div className="card_regis">
        <div className="card_content">
        <div className="titleContainer">
            <div className="card_title">Register</div>
            <div className="underline_title_regis"></div>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={name} id="myInput" placeholder="Enter Your Name Here" onChange={ev => setName(ev.target.value)} className={"inputBox"} />
            <label id="myInput-label">Enter Your Name Here</label>
            <label className="errorLabel">{nameError}</label>
        {/* </div>
        <br/>
        <div className="inputContainer"> */}
            <input  value={email} id="myInput1" placeholder="Enter Your Email Here" onChange={ev => setEmail(ev.target.value)} className={"inputBox"} />
            <label id="myInput-label1">Enter Your Email Here</label>
                <label className="errorLabel">{emailError}</label>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={phoneNumber} id="myInput" placeholder="Enter Your Phone Number Here" onChange={ev => setPhoneNumber(ev.target.value)} className={"inputBox"} />
            <label id="myInput-label">Enter Your Phone Number Here</label>
            <label className="errorLabel">{phoneNumberError}</label>
        {/* </div>
        <br/>

        <div className="inputContainer"> */}
        <input type="date" value={dateOfBirth} id="myInput1" onChange={handleDateOfBirthChange} className={"inputBox"} />
        <label id="myInput-label1">Enter Your DOB Here</label>
        <label className="errorLabel">{DOBError}</label>
        </div>
        <br />

        <div className="inputContainer">
            <input  value={password} id="myInput" type={showPassword ? "text" : "password"} placeholder="Enter Your Password Here" onChange={ev => setPassword(ev.target.value)} className={"inputBox"} />
            <label id="myInput-label">Enter Your Password Here</label>
            <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon1`} onClick={togglePasswordVisibility} />
            <label className="errorLabel">{passwordError}</label>
        {/* </div>
        <br/>
        <div className="inputContainer"> */}
            <input  value={repeatPassword} id="myInput1" type={showRepeatPassword ? "text" : "password"} placeholder="Repeat The Password Here" onChange={ev => setrepeatPassword(ev.target.value)} className={"inputBox"} />
            <label id="myInput-label1">Repeat Password Here</label>
            <i className={`fa ${showRepeatPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`} onClick={toggleRepeatPasswordVisibility} />
            <label className="errorLabel">{repeatPasswordError}</label>
        </div>
        <br/>

        <div className="inputContainer">
        
        {/* </div>
        <br />

        <div className="inputContainer"> */}
        <input className={"inputButton"} type="button" onClick={onButtonClick} value={"Register"} />
        </div>
        <div className="inputContainer">
        <a href="/login" id="login">Already have Account</a>
        </div>
        </div>
        </div>
    </div>
    </div>
    )
}

export default Register