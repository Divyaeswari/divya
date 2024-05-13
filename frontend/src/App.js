import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./views/Login";
import RegisterPage from "./views/RegisterNew";
import MainPage from "./pages/MainPage";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Header from "./components/navbar/commonHeader";
import Logout from "./views/Logout";
import AdminDashboard from "./layouts/Admin";
import UserDashboard from "./layouts/User";
//import ResetPassword
import './App.css';
import { useEffect,useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [Register, setRegister] = useState(false);
  const [mainPage, setMainPage] = useState(false);
   const [forgotPassword, setForgotPassword] = useState(false);
   const [resetPassword, setResetPassword] = useState(false);
  //const [OTPInput, setOTPInput] = useState(false);
  const [email, setEmail] = useState("");

  const [adminPage, setAdminPage] = useState(false);
  const [userPage, setUserPage] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
      {/* <Header isAuthenticated={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} /> */}
      <Routes>
        <Route path="/"  element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/register" element={<RegisterPage Register={Register} setRegister={setRegister} />} />
        <Route path="/main_page" element={<MainPage mainPage={mainPage} setMainPage={setMainPage} />} />
        <Route path="/forgot_password" element={<ForgotPassword forgotPassword={forgotPassword} setForgotPassword={setForgotPassword} />} />
        <Route path="/reset_password" element={<ResetPassword resetPassword={resetPassword} setResetPassword={setResetPassword} />} /> 
        <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} setEmail={setEmail} />} /> 
        <Route path="/admin_page" element={<AdminDashboard adminPage={adminPage} setAdminPage={setAdminPage} />} />
        <Route path="/user_page" element={<UserDashboard userPage={userPage} setUserPage={setUserPage} />} />
      </Routes>
      </BrowserRouter>
    </div>
  );


}

export default App
