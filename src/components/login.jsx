import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
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

      window.alert("Login successful!");
      localStorage.setItem(
        "currentUser",
        JSON.stringify(matchedUser)
    );
      navigate("/",{ replace: true });

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
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
        />

        <button type="submit">
          Login
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