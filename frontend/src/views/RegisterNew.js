import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from "../components/navbar/commonHeader";
import '@fortawesome/fontawesome-free/css/all.min.css';
//import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
// import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
//import GoogleIcon from '@mui/icons-material/Google';

//import { FaFacebook, FaLinkedin, FaGoogle } from 'react-icons/fa';

// import googleImage from '../assets/img/google.jpg';

//import RegisterDB from "../../../backend/models/RegisterModel";

const Register = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   // const [repeatPassword, setrepeatPassword] = useState("");
    //const [phoneNumber, setPhoneNumber] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    //const [repeatPasswordError, setrepeatPasswordError] = useState("");
    //const [phoneNumberError, setPhoneNumberError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
   // const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    //const [selectedImage, setSelectedImage] = useState(null);
    //const [dateOfBirth, setDateOfBirth] = useState("");
    //const [DOBError, setDOBError] = useState("");
    const navigate =  useNavigate();
    const isAuthenticated = false;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const toggleRepeatPasswordVisibility = () => {
    //     setShowRepeatPassword(!showRepeatPassword);
    // };

    // const handleDateOfBirthChange = (event) => {
    //     // Handle date of birth selection
    //     setDateOfBirth(event.target.value);
    // };

    const onButtonClick = async () => {
        // const api = await fetch('http://localhost:5000/register',{ method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',}});
        // console.log(api);

        setNameError("")
        setEmailError("")
       // setPhoneNumberError("")
        setPasswordError("")
        //setrepeatPassword("")
        //setDOBError(")")


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

        // if ("" === phoneNumber) {
        //     setPhoneNumberError("Please enter a Phone Number")
        //     return
        // }

        // if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber)) {
        //     setPhoneNumberError("Please enter a valid Phone Number")
        //     return
        // }

        // if (phoneNumber.length < 11 && phoneNumber.length >= 11) {
        //     setPhoneNumberError("Phone Number must be 10 numbers")
        //     return
        // }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        // if ("" === repeatPassword) {
        //     setrepeatPasswordError("Please enter a Repeat password")
        //     return
        // }

        // if (password != repeatPassword) {
        //     setrepeatPasswordError("The password and Repeat Password must be same")
        //     return
        // }

        // const today = new Date();
        // const birthDate = new Date(dateOfBirth);
        // const age = today.getFullYear() - birthDate.getFullYear();
        // const monthDiff = today.getMonth() - birthDate.getMonth();
        // if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        //     age--;
        // }

        // if (age < 18) {
        //     setDOBError('You must be at least 18 years old to register.');
        //     return;
        // }


        

            const userData = {
                username: name,
                email: email,
                password: password,
                //phoneno: phoneNumber,
               // dateOfBirth: dateOfBirth,
                //role: 'user'
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
        {/* <div className="card_content"> */}

        <div className="leftSection">
        <h1>Welcome Back!</h1>
        <p>To Keep Connected with us please login with your personal info</p>
        <button>SIGNIN</button>
      </div>
      <div className="rightSection">

        <div className="titleContainer">
            <div className="card_title1">Create Account</div>
            {/* <div className="underline_title_regis"></div> */}
        </div>
        <br/>
        <div className="inputContainer">
        {/* <FacebookRoundedIcon color="primary" sx={{ fontSize: 52 }} /> */}
        <div class="icon-container">
            <i class="fab fa-facebook-f fa-2x"></i>
        </div>
        <div class="icon-container">
            <i class="fab fa-google fa-2x"></i>
        </div>

        <div class="icon-container">
            <i class="fab fa-linkedin-in fa-2x"></i>
        </div>

        {/* <GoogleIcon color="primary" sx={{ fontSize: 52 }} />
        <FaGoogle size={30} color="#4285F4" /> */}
        
        </div>
        <p className="manual"> to use your manual for registration</p>
        <br/>
        <div className="input-container">
        <i class="fas fa-user"></i>
            <input  value={name}  placeholder="Name" onChange={ev => setName(ev.target.value)} className={"inputBox"} />
            <label className="errorLabel">{nameError}</label>
        </div>
        <br/>
        <div className="input-container">
        <i class="fas fa-envelope"></i>
            <input  value={email} placeholder="Email" onChange={ev => setEmail(ev.target.value)} className={"inputBox"} />
                <label className="errorLabel">{emailError}</label>
        </div>
        <br/>

        <div className="input-container">
        <i class="fas fa-lock"></i>
            <input  value={password} type={showPassword ? "text" : "password"} placeholder="Password" onChange={ev => setPassword(ev.target.value)} className={"inputBox"} />
            <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility} style={{ marginLeft: '280px' }} />
            <label className="errorLabel">{passwordError}</label>
         </div>
        <br/>
        <div className="input-container">
        <button onClick={onButtonClick}>SIGNUP</button>
        </div>
        {/* <div className="inputContainer">
        <a href="/login" id="login">Already have Account</a>
        </div> */}
        </div>
        {/* </div> */}
    </div>
    </div>
    </div>
    )
}

export default Register