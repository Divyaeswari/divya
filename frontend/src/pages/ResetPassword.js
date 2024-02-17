import React, { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpError, setOtpError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

        try {
            // Call API to reset password (not implemented here)
            // Example: /resetPassword endpoint
            // Show success message upon password reset
            withReactContent(Swal).fire({
                title: 'Success!',
                text: 'Your password has been reset successfully.',           
            });
        } catch (error) {
            console.error('Error resetting password:', error);
            // Handle network errors or other issues
        }
    };

    return (
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
                        <input  value={password} id="myInput" type="password" placeholder="Enter New Password" onChange={ev => setPassword(ev.target.value)} className={"inputBox passwordInput"} />
                        <label id="myInput-label">Enter New Password</label>
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br/>

                    <div className="inputContainer">
                        <input  value={confirmPassword} id="myInput" type="password" placeholder="Confirm New Password" onChange={ev => setConfirmPassword(ev.target.value)} className={"inputBox passwordInput"} />
                        <label id="myInput-label">Confirm New Password</label>
                        <label className="errorLabel">{confirmPasswordError}</label>
                    </div>
                    <br/>

                    <div className="inputContainer">
                        <input className={"inputButton"} type="button" onClick={resetPassword} value={"Reset Password"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
