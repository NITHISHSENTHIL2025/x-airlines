import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./loginandcreateacc.css";

function CreateAccount() {
    const navigate = useNavigate();
    const firstInputRef = useRef(null);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        boy: "" // Year of Birth
    });
    
    const [error, setError] = useState("");

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    // SUPERB FEATURE: Clean, scalable state handler
    function handleChange(event) {
        const { name, value } = event.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
        setError(""); // Clear error when user types
    }

    function handleSubmit(event) {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Validation
        if (!form.firstName.trim() || !form.email.trim() || !form.password || !form.address.trim() || !form.boy) {
            return setError("Please fill in all required fields.");
        }

        const existingUser = users.find(user => user.email.toLowerCase() === form.email.toLowerCase());
        if (existingUser) {
            return setError("An account with this email already exists.");
        }

        // Immutable push
        const updatedUsers = [...users, form];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        
        // Auto-login the user immediately upon creation for better UX
        localStorage.setItem("currentUser", JSON.stringify(form));
        navigate("/", { replace: true });
    }

    return (
        <div className="create-accountcard">
            <div className="create-accountT">
                <h1 className="create-account-title">Create Account</h1>
            </div>
            
            <form className="create-account-form" onSubmit={handleSubmit}>
                {error && <p style={{ color: "#ff4d4f", textAlign: "center", fontWeight: "bold" }}>{error}</p>}

                <input
                    type="text"
                    placeholder="First Name *"
                    minLength={2}
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    ref={firstInputRef}
                />
                <input
                    type="text"
                    placeholder="Last Name (Optional)"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email Address *"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password *"
                    name="password"
                    minLength={8}
                    maxLength={20}
                    value={form.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Full Address *"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    maxLength={60}
                />
                <input
                    type="number"
                    placeholder="Year of Birth *"
                    name="boy"
                    value={form.boy}
                    onChange={handleChange}
                    min="1920"
                    max={new Date().getFullYear() - 12} // Must be at least 12 years old
                />

                <button type="submit" className="create-account-button">
                    Create Account
                </button>
                
                <h3 className="or">Already have an account?</h3>
                <Link to="/login" className="login-link">Login here.</Link>
            </form>
        </div>
    );
}

export default CreateAccount;