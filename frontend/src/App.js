import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import './App.css';
import { useEffect,useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [Register, setRegister] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/register" element={<RegisterPage Register={Register} setRegister={setRegister} />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
