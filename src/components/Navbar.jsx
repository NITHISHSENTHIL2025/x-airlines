import { Link, useNavigate } from "react-router-dom";

function Navbar() {

const navigate = useNavigate();

const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

function handleLogout() {

localStorage.removeItem("currentUser");

navigate("/login");

}

return (

<nav className="homenav">

<h1 className="home-title">
X Airlines
</h1>

<ul className="home-links">

<li>

{
currentUser ? (

<Link to="/" className="home-link">
Home
</Link>

) : (

<Link to="/login" className="home-link">
Login
</Link>

)
}

</li>

<li>

<Link to="/about" className="home-link">
About
</Link>

</li>

<li>
{currentUser?(<Link to="/my-bookings" className="home-link">
My Bookings
</Link>):null}


</li>

{
currentUser && (

<li>

<button
className="logout-btn"
onClick={handleLogout}
>

Logout

</button>

</li>

)
}

</ul>

</nav>

);

}

export default Navbar;