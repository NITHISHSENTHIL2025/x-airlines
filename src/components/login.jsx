import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Loades from "../assets/loader.svg";
import "./loginandcreateacc.css";

function Login() {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (emailRef.current) emailRef.current.focus();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const matchedUser = users.find(
            user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
        );

        if (matchedUser) {
            localStorage.setItem("currentUser", JSON.stringify(matchedUser));
            setLoading(true);
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 1200);
        } else {
            setError("Invalid email or password combination.");
            setPassword(""); // Clear password for retry
        }
    }

    return (
        <div className="login">
            <div className="nav">
                <h1 className="login-title">Login</h1>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                {error && <p style={{ color: "#ff4d4f", textAlign: "center", fontWeight: "bold", margin: 0 }}>{error}</p>}

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" style={{ padding: loading ? "0px" : "20px" }} disabled={loading}>
                    {loading ? <img src={Loades} alt="Loading..." className="loade" /> : "Login"}
                </button>
                
                <h3 className="or">Don't have an account?</h3>
                <Link to="/createAccount" className="create-account">
                    Create one here.
                </Link>
            </form>
        </div>
    );
}

export default Login;