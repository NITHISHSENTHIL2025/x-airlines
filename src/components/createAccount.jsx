import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateAccount() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: ""
    });
    function handleChange(event) {

    const name = event.target.name;

    const value = event.target.value;

    setForm(function(prevForm) {

        const updatedForm = {

            firstName: prevForm.firstName,
            lastName: prevForm.lastName,
            email: prevForm.email,
            password: prevForm.password

        };

        updatedForm[name] = value;

        return updatedForm;

    });

}
   function handleSubmit(event) {

    event.preventDefault();

    const usercheck =
        JSON.parse(localStorage.getItem("users"))
        || [];

    if (
        !form.firstName ||
        !form.lastName ||
        !form.email ||
        !form.password
    ) {

        window.alert("Please fill all fields");

        return;
    }

    const existingUser = usercheck.find(
        user => user.email === form.email
    );

    if(existingUser) {

        window.alert(
            "Email already exists"
        );

        return;
    }

    usercheck.push(form);

    localStorage.setItem(
        "users",
        JSON.stringify(usercheck)
    );

    window.alert(
        `Welcome ${form.firstName}`
    );

    navigate("/login",{ replace: true });

}
    return (
        <div className="create-accountcard">
            <div className="create-accountT">
                <h1 className="create-account-title">Create Account</h1>
            </div>
            <form className="create-account-form" onSubmit={handleSubmit}>
                <input id="name"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button type="submit" className="create-account-button" >
                    Create Account
                </button>
                <h3 className="or">Already have an account?</h3>
                <Link to="/login" className="login-link">
                    Login here.
                </Link>

            </form>

        </div>
    );
}

export default CreateAccount;