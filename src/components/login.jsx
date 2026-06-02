import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./loginandcreateacc.css"
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Loades from "../assets/loader.svg";
function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  useEffect(() => {
      emailRef.current.focus();
    }, []);
  const [loading, setLoading] = useState(false);
  
  function handleSubmit(event) {
  
    event.preventDefault();
    
    const users =
      JSON.parse(localStorage.getItem("users"))
      || [];

    const matchedUser = users.find(
      user =>
        user.email === event.target.email.value &&
        user.password === event.target.password.value
    );
    
    

    if (matchedUser) {

      
      localStorage.setItem(
        "currentUser",
        JSON.stringify(matchedUser)
    );
    setLoading(true);
    setTimeout(() => {
        navigate("/",{ replace: true });
    }, 3000);
      

    } else {

      window.alert(
        "Invalid email or password"
      );

    }

}
  return (
    <>
    
    <div className="login">

      <div className="nav">
        <h1 className="login-title">Login</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="email"
          name="email"
          ref={emailRef}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
        />

        <button type="submit" style={{padding: loading ? "0px" : "20px"}}>
          {loading ? <img src={Loades} alt="Loading..." className="loade"/> : "Login"}
        </button>
        <h3 className="or">Don't have an account?</h3>
        <Link to="/createAccount" className="create-account">
          Create one here.
        </Link>  

      </form>

    </div>
    </>
  );
}

export default Login;