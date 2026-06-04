import "./support.css"
import { useState } from "react";
function Support() {
    const [sup,setSup] = useState("");
    
    return (
        <div className="support">
            <div className="supportcontent">
                <button className="supportbutton" onClick={()=>setSup("PP")}>Support</button>
                <button className="supportbutton" onClick={()=>setSup("Contact")}>Contact Us</button>
                <button className="supportbutton" onClick={()=>setSup("FAQ")}>FAQ</button>
                <button className="supportbutton" onClick={()=>setSup("Terms")}>Terms of service</button>
            </div>
            <div className="supports">
                {sup==="PP"?(<div className="supportdetails">
                    
                        <h1>Privacy Policy</h1>

<p>
    At X Airlines, we value your privacy and are committed to protecting your
    personal information.
</p>

<h2>Information We Collect</h2>
<ul>
    <li>Name</li>
    <li>Email Address</li>
    <li>Phone Number</li>
    <li>Flight Booking Information</li>
    <li>Support Requests and Attachments</li>
    <li>Device and Browser Information</li>
</ul>

<h2>How We Use Your Information</h2>
<ul>
    <li>Manage your account</li>
    <li>Process bookings</li>
    <li>Provide customer support</li>
    <li>Improve our services</li>
    <li>Maintain platform security</li>
</ul>

<h2>Data Protection</h2>
<p>
    We implement reasonable security measures to protect your information
    from unauthorized access or misuse.
</p>

<h2>Third-Party Services</h2>
<p>
    Some services, such as payment processing, may be handled by trusted
    third-party providers.
</p>

<h2>Your Rights</h2>
<ul>
    <li>Request access to your personal information</li>
    <li>Request correction of inaccurate information</li>
    <li>Request deletion of personal information where applicable</li>
</ul>

<h2>Policy Updates</h2>
<p>
    This Privacy Policy may be updated periodically. Continued use of
    X Airlines constitutes acceptance of any updates.
</p>


</div>):sup==="Contact"?(<div className="supportdetails"><h1>Contact Us</h1>

<p>We are here to help.</p>

<h2>Customer Support</h2>
<p>Email: support@xairlines.com</p>

<h2>Support Hours</h2>
<p>24 Hours / 7 Days a Week</p>

<h2>Support Categories</h2>
<ul>
    <li>Booking Issues</li>
    <li>Payment Issues</li>
    <li>Flight Changes</li>
    <li>Cancellations & Refunds</li>
    <li>Account Problems</li>
    <li>Boarding Pass Assistance</li>
    <li>Technical Support</li>
    <li>General Inquiries</li>
</ul>

<h2>Response Time</h2>
<p>
    Most support requests receive a response within 24–48 hours.
</p>

<h2>Before Contacting Support</h2>
<ul>
    <li>Registered Email Address</li>
    <li>Booking Reference (if applicable)</li>
    <li>Description of the issue</li>
    <li>Relevant screenshots or documents</li>
</ul>

<p>
    Thank you for choosing X Airlines. We are committed to providing
    a smooth, secure, and reliable travel experience.
</p></div>):sup==="FAQ"?(<div className="supportdetails"><h1>Frequently Asked Questions (FAQ)</h1>

<h2>How do I book a flight?</h2>
<p>
    Search for available flights, select your preferred option,
    choose seats, and complete payment.
</p>

<h2>Can I cancel my booking?</h2>
<p>
    Cancellation availability depends on the airline's policy and fare type.
</p>

<h2>How do I view my boarding pass?</h2>
<p>
    After a successful booking, your boarding pass will be available
    in your booking details.
</p>

<h2>What payment methods are accepted?</h2>
<p>
    Supported payment methods will be displayed during checkout.
</p>

<h2>Can I change my seat after booking?</h2>
<p>
    Seat changes depend on availability and airline policies.
</p>

<h2>I forgot my account password. What should I do?</h2>
<p>
    Use the "Forgot Password" option on the login page.
</p>

<h2>My payment was successful but I did not receive a booking confirmation.</h2>
<p>
    Contact X Airlines Support with your payment reference and booking details.
</p>

<h2>How can I contact support?</h2>
<p>
    Visit the Contact Us section below or submit a support ticket.
</p>

</div>):(<div className="supportdetails"><h1>Terms of Service</h1>

<p>
    By using X Airlines, you agree to the following terms and conditions.
</p>

<h2>Account Responsibility</h2>
<ul>
    <li>You are responsible for maintaining the security of your account.</li>
    <li>Information provided during registration must be accurate and up to date.</li>
</ul>

<h2>Booking Services</h2>
<ul>
    <li>Flight availability and pricing are subject to change.</li>
    <li>Bookings may be modified or cancelled according to airline policies.</li>
</ul>

<h2>Prohibited Activities</h2>
<ul>
    <li>Using false or misleading information.</li>
    <li>Attempting unauthorized access to the platform.</li>
    <li>Disrupting platform operations.</li>
    <li>Engaging in fraudulent activities.</li>
</ul>

<h2>Limitation of Liability</h2>
<p>
    X Airlines is not responsible for delays, cancellations, service
    interruptions, or circumstances beyond our control.
</p>

<h2>Termination</h2>
<p>
    We reserve the right to suspend or terminate accounts that violate
    these terms.
</p>

<h2>Changes to Terms</h2>
<p>
    These terms may be updated without prior notice.
</p>


</div>)}
            </div>
            
        </div>
    );
}
export default Support;