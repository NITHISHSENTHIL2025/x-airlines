import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
import Airp from "../assets/airlogo.png"
import { useState } from "react";
function Navbar() {

const navigate = useNavigate();
const [tit,settit] = useState(true);

const [currentUser,setCurrentUser] = useState(
 JSON.parse(localStorage.getItem("currentUser"))
);

function handleLogout() {

localStorage.removeItem("currentUser");

navigate("/login");

}

return (

<nav className="homenav">
{tit?
<img src={Airp

} className="airp" onClick={()=>settit(false)}/>:<h1 onClick={()=>settit(true)}>X Airlines</h1>}

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
{currentUser?(<Link to="/Mybookings" className="home-link">
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