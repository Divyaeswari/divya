import React, { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate =  useNavigate();

    const sendOTP = async () => {
        setEmailError("");

        // Basic email validation
        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        const userLoginData = {
            email: email,
        };  
    
        try {

            const response = await fetch('http://localhost:5000/sendOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userLoginData)
            });

            console.log(response)
    
            if (response.ok) {
                if(response.status == 200)
                {
                    withReactContent(Swal).fire({
                        title: 'Success!',
                        text: 'An OTP has been sent to your email address.',           
                    }).then(function() {
                        navigate("/reset_password");
                  });
                }
                else if(response.status == 400)
                {
                    withReactContent(Swal).fire({
                        title: 'Alert!',
                        text: 'Email Wrong or Email not registered.',           
                    });
                }
                else if(response.status == 500)
                {
                    withReactContent(Swal).fire({
                        title: 'Alert!',
                        text: 'Error sending email, Failed to send OTP.'         
                    });
                }
        }
        } catch (error) {
            console.error('Error sending OTP:', error);
            // Handle network errors or other issues
        }
    };

    return (
        <div className="mainContainer">
            <div className="card">
                <div className="card_content">
                    <div className="titleContainer">
                        <div className="card_title" id="card_title">ForgotPassword</div>
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
                        <input className={"inputButton"} type="button" onClick={sendOTP} value={"Send OTP"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
