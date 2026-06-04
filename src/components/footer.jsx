import "./footer.css"
import { Link, useNavigate } from "react-router-dom";
function Footer() {
const navigate = useNavigate();
return (

<footer className="footer">

<h1 className="footer-logo">
✈ X Airlines
</h1>

<p className="footer-text">

Book domestic and international flights
with comfort and best prices.

</p>

<div className="footer-links">

<Link to="/support" className="footer-link">Support</Link>

</div>

<p className="footer-copy">

© 2026 X Airlines. All Rights Reserved.

</p>

</footer>

);

}

export default Footer;