import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./passengerdetails.css";
import "./Checkout.css";
import Loading2 from "../assets/loader.svg";

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // REFRESH CRASH PROTECTION
    const [bookingData, setBookingData] = useState(() => {
        if (location.state) {
            sessionStorage.setItem("pendingCheckout", JSON.stringify(location.state));
            return location.state;
        }
        return JSON.parse(sessionStorage.getItem("pendingCheckout"));
    });

    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");
    const [agree, setAgree] = useState(false);

    // GUARD: No Data Fallback
    if (!bookingData) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h1>No Booking Found</h1>
                <button onClick={() => navigate("/")} style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>
                    Return Home
                </button>
            </div>
        );
    }

    const { flight, departure, destination, date, selectedSeats = [], passengers = 1, isboard } = bookingData;

    // PASSENGER DETAILS STATE
    const [passengerDetails, setPassengerDetails] = useState(
        Array.from({ length: passengers }, () => ({ name: "", age: "", gender: "" }))
    );

    // IMMUTABLE UPDATE FIX
    const handlePassengerChange = (index, field, value) => {
        if (field === "name" && /[^a-zA-Z\s]/.test(value)) return;

        setPassengerDetails(prevDetails => 
            prevDetails.map((passenger, i) => 
                i === index ? { ...passenger, [field]: value } : passenger
            )
        );
        setError(""); // Clear errors on typing
    };

    // PRICE CALCULATIONS
    const ticketPrice = (flight?.price || 0) * passengers;
    const boardingFee = isboard ? 299 * passengers : 0;
    const totalAmount = ticketPrice + boardingFee;

    const handlePayment = () => {
        
        // 🚨 BUG FIX: Enforced strict age boundaries along with empty field checks
        const hasInvalidData = passengerDetails.some(
            p => !p.name.trim() || p.age < 1 || p.age > 120 || !p.gender
        );

        if (hasInvalidData) return setError("Please fill all details and ensure age is between 1-120.");
        if (!agree) return setError("You must accept the Privacy Policy to proceed.");

        setError("");
        setLoad(true);

        setTimeout(() => {
            navigate("/payment", {
                state: { flight, departure, destination, date, passengerDetails, selectedSeats, passengers, totalAmount, isboard },
                replace: true // Prevents going backwards to an empty checkout
            });
        }, 1500);
    };

    return (
        <div className="checkout-page">
            
            <div className="checkout-top">
                <h1 className="passengerd">Passenger Details</h1>

                {passengerDetails.map((passenger, index) => (
                    <div className="passenger-card" key={index}>
                        <h2>Passenger {index + 1}</h2>
                        
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={passenger.name}
                            onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                        />
                        
                        <input
                            type="number"
                            min="1"
                            max="120"
                            placeholder="Age"
                            value={passenger.age}
                            onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                        />
                        
                        <select
                            value={passenger.gender}
                            onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                ))}

                <div className="privacy-box">
                    <input type="checkbox" checked={agree} onChange={() => { setAgree(!agree); setError(""); }} />
                    <p>I agree to the Privacy Policy and Terms & Conditions</p>
                </div>
                
                {/* INLINE ERROR REPORTING */}
                {error && <p style={{ color: "red", marginLeft: "40px", fontWeight: "bold" }}>{error}</p>}
            </div>

            <div className="checkout-final">
                
                <h1>Booking Summary</h1>
                <h2 className="flightnamesummary">{flight?.airline || "Flight"} Airlines</h2>

                <div className="summary-box">
                    <p>{departure} → {destination}</p>
                    <p>Date: {date}</p>
                    <p>Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Unassigned"}</p>
                    <p>Passengers: {passengers}</p>
                </div>

                <div className="price-box">
                    <div className="price-row"><p>Ticket Fare: ₹{ticketPrice}</p></div>
                    {isboard && <div className="price-row"><p>Boarding Fee: ₹{boardingFee}</p></div>}
                </div>

                <p className="totalamt">Total Amount: ₹{totalAmount}</p>

                <button 
                    className="payment-btn" 
                    onClick={handlePayment} 
                    disabled={load} 
                    style={{ padding: load ? "0" : "24px" }}
                >
                    {load ? <img src={Loading2} className="loader" alt="loading" /> : "Proceed to payment"}
                </button>
                
            </div>
        </div>
    );
}

export default Checkout;