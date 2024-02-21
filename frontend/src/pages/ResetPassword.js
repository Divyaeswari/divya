import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";
import Header from './commonHeader';

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpError, setOtpError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [resetPasswordEmail, setResetPasswordEmail] = useState("");
    const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate =  useNavigate();

    const isAuthenticated = false;

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        // Retrieve email from localStorage when component mounts
        const email = localStorage.getItem('resetPasswordEmail');
        setResetPasswordEmail(email);

        // Start the countdown timer
        const interval = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1); // Decrease the countdown by 1 second
            }
            else {
                // If countdown reaches zero, navigate to the forgot password page
                navigate('/forgot_password');
            }
        }, 1000); // Update every second

        // Cleanup function to clear the interval when component unmounts
        return () => clearInterval(interval);
    }, [countdown, navigate]); // Include countdown in the dependencies array to ensure it updates properly

    const resetPassword = async () => {
        // Reset error messages
        setOtpError("");    
        setPasswordError("");
        setConfirmPasswordError("");

        // Validate OTP, password, and confirm password
        if (otp === "") {
            setOtpError("Please enter the OTP");
            return;
        }

        if (password === "") {
            setPasswordError("Please enter your new password");
            return;
        }

        if (confirmPassword === "") {
            setConfirmPasswordError("Please confirm your new password");
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        const resetPasswordData = {
            email: resetPasswordEmail,
            otp: otp,
            password: password,
        };  

        try {
            const response = await fetch('http://localhost:5000/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resetPasswordData)
            });

            console.log(response)
    
            if (response.ok) {

                if(response.status == 200)
                
                withReactContent(Swal).fire({
                    title: 'Success!',
                    text: 'Password Reset successfully.',           
                  }).then(function() {
                        navigate("/login");
                  });
            }else if(!response.ok)
            {
                if (response.status == 400)
                {
                    withReactContent(Swal).fire({
                        title: 'Alert!',
                        text: 'OTP Not Found.',           
                    }).then(function() {
                        navigate("/forgot_password");
                    });  
                }
                else if (response.status == 401)
                {
                    withReactContent(Swal).fire({
                        title: 'Alert!',
                        text: 'OTP Expired.',           
                    }).then(function() {
                        navigate("/forgot_password");
                    });
                }
                
            } 
        } catch (error) {
            console.error('Error resetting password:', error);
            // Handle network errors or other issues
        }
    };

    return (
        <div>
        <Header isAuthenticated={isAuthenticated} />
        <div className="mainContainer">
            <div className="card">
                <div className="card_content">
                    <div className="titleContainer">
                        <div className="card_title" id="card_title">ResetPassword</div>
                        <div className="underline_title"></div>
                    </div>
                    <br/>

                    <div className="inputContainer">
                        <input  value={otp} id="myInput" placeholder="Enter OTP" onChange={ev => setOtp(ev.target.value)} className={"inputBox"} />
                        <label id="myInput-label">Enter OTP</label>
                        <label className="errorLabel">{otpError}</label>
                    </div>
                    <br/>
                    <div className="inputContainer">
                        <input  value={password} id="myInput" type={showNewPassword ? "text" : "password"} placeholder="Enter New Password" onChange={ev => setPassword(ev.target.value)} className={"inputBox passwordInput"} />
                        <i className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`} onClick={toggleNewPasswordVisibility} />
                        <label id="myInput-label">Enter New Password</label>
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br/>

                    <div className="inputContainer">
                        <input  value={confirmPassword} id="myInput" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm New Password" onChange={ev => setConfirmPassword(ev.target.value)} className={"inputBox passwordInput"} />
                        <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`} onClick={toggleConfirmPasswordVisibility} />
                        <label id="myInput-label">Confirm New Password</label>
                        <label className="errorLabel">{confirmPasswordError}</label>
                    </div>
                    <br/>

                    <div className="inputContainer">
                        <input className={"inputButton"} type="button" onClick={resetPassword} value={"Reset Password"} />
                    </div>

                    {/* Show countdown timer */}
                    <div>Time remaining for OTP validity: {countdown} seconds</div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ResetPassword;
