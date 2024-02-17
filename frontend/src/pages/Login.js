import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate =  useNavigate();

    const onButtonClick = async () => {


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

        const userLoginData = {
            email: email,
            password: password,
        };  
    
        try {

            const response = await fetch('http://localhost:5000/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userLoginData)
            });

            console.log(response)
    
            if (response.ok) {
                if(response.status == 200)
                
                withReactContent(Swal).fire({
                    title: 'Success!',
                    text: 'Login successfully.',           
                  }).then(function() {
                        navigate("/main_page");
                  });
            }else if(!response.ok)
            {
                if (response.status == 400)
                {
                    withReactContent(Swal).fire({
                        title: 'Alert!',
                        text: 'Email Wrong or Email not registered.',           
                    }).then(function() {
                        navigate("/register");
                    });  
                }
                else if (response.status == 401)
                {
                    withReactContent(Swal).fire({
                        title: 'Alert!',
                        text: 'Incorrect password. Please try again.',           
                    }).then(function() {
                        setPassword('');
                    });
                }
                
            } 
            
            else {
                // Handle error response
                const data = await response.json();
                console.error('Registration failed:', data.error);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle network errors or other issues
        }

    };

    return <div className="mainContainer">
        <div className="card">
        <div className="card_content">
        <div className="titleContainer">
            <div className="card_title">Login</div>
            <div className="underline_title"></div>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={email} id="myInput" placeholder="Enter Your Email Here" onChange={ev => setEmail(ev.target.value)} className={"inputBox"} />
            <label id="myInput-label">Enter Your Email Here</label>
            <label className="errorLabel">{emailError}</label>
        </div>
        <br/>
        <div className="inputContainer">
            <input  value={password} id="myInput" type="password" placeholder="Enter Your Password Here" onChange={ev => setPassword(ev.target.value)} className={"inputBox passwordInput"} />
            <label id="myInput-label">Enter Your Password Here</label>
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br/>
        <div className="inputContainer">
        <input className={"inputButton"} type="button" onClick={onButtonClick} value={"Login"} />
        </div>

        <div className="inputContainer">
        <a href="/forgot_password" id="signup">Forgot Password?</a>
        </div>
        <div className="inputContainer">
        <a href="/register" id="signup">Don't have account yet?</a>
        </div>
        </div>
        </div>
    </div>
}

export default Login