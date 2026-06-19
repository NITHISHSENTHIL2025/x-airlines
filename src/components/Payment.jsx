import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Loading2 from "../assets/loader.svg";
import "./payment.css";

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    // FEATURE: Generate unique PNR and Flight Number once on load
    const pnr = useMemo(() => "PNR" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 10), []);
    const flightnum = useMemo(() => Math.floor(Math.random() * 900) + 100, []);

    // STATES
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false); 
    const [error, setError] = useState("");

    // CONTROLLED INPUT STATES
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    // VALIDATION: Graceful fallback if user accesses page directly
    if (!location.state) {
        return (
            <h1 style={{ textAlign: "center", marginTop: "100px" }}>
                No Payment Data Found
            </h1>
        );
    }

    const {
        totalAmount,
        flight,
        departure,
        destination,
        date,
        selectedSeats,
        passengers,
        passengerDetails,
        isboard
    } = location.state;

    const handlePayment = async () => {
        
        // 🚨 BUG FIX: Strict Validation for UPI and Card Lengths
        if (paymentMethod === "UPI" && !upiId.trim()) {
            return setError("Please enter a valid UPI ID.");
        }
        if (paymentMethod === "Card" && (cardNumber.length !== 16 || !cardName.trim() || !expiry.trim() || cvv.length !== 3)) {
            return setError("Please enter a valid 16-digit card number and 3-digit CVV.");
        }

        setError("");
        setLoading(true);

        // Simulate an API network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        const cu = JSON.parse(localStorage.getItem("currentUser"));
        const oldTickets = JSON.parse(localStorage.getItem("tickets")) || [];

        // Safely map over passenger array
        const newTickets = passengerDetails?.map((passenger, index) => ({
            pnr: pnr,
            flight,
            departure,
            destination,
            date,
            current: cu?.email,
            flightnumber: flightnum,
            passengerName: passenger.name,
            passengerAge: passenger.age,
            passengerGender: passenger.gender,
            selectedSeat: selectedSeats[index] || "Unassigned",
            passengers: 1,
            totalAmount: flight.price + (isboard ? 299 : 0)
        })) || [];

        // Safe immutable array update
        const updatedTickets = [...oldTickets, ...newTickets];
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));

        // 🚨 BUG FIX: Clear session storage to prevent stale data
        sessionStorage.removeItem("pendingCheckout");

        setLoading(false);
        setSuccess(true); // Trigger the green checkmark

        // Wait 1.5 seconds so the user sees the success message, THEN navigate
        setTimeout(() => {
            navigate("/Mybookings", { replace: true });
        }, 1500); 
    };

    return (
        <div className="payment-page">
            <div className="payment-card">
                
                <h1 className="payment-title">Complete Payment</h1>
                <h2 className="payment-amount">₹{totalAmount}</h2>

                <div className="payment-methods">
                    <div
                        className={paymentMethod === "UPI" ? "payment-option active-payment" : "payment-option"}
                        onClick={() => { setPaymentMethod("UPI"); setError(""); }}
                    >
                        UPI
                    </div>
                    
                    <div
                        className={paymentMethod === "Card" ? "payment-option active-payment" : "payment-option"}
                        onClick={() => { setPaymentMethod("Card"); setError(""); }}
                    >
                        Card
                    </div>
                    
                    <div
                        className={paymentMethod === "NetBanking" ? "payment-option active-payment" : "payment-option"}
                        onClick={() => { setPaymentMethod("NetBanking"); setError(""); }}
                    >
                        Net Banking
                    </div>
                </div>

                {/* ERROR DISPLAY */}
                {error && <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>{error}</p>}

                {paymentMethod === "UPI" && (
                    <div className="Upi">
                        <input
                            type="text"
                            placeholder="Enter UPI ID"
                            className="payment-input"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                        <select className="selectupi">
                            <option value="@okaxis">@okaxis</option>
                            <option value="@okicici">@okicici</option>
                            <option value="@okybl">@okybl</option>
                            <option value="@oksbi">@oksbi</option>
                            <option value="@okhdfcbank">@okhdfcbank</option>
                        </select>
                    </div>
                )}

                {paymentMethod === "Card" && (
                    <>
                        <input
                            type="number"
                            placeholder="Card Number (16 Digits)"
                            className="payment-input"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        
                        <input
                            type="text"
                            placeholder="Card Holder Name"
                            className="payment-input"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                        />
                        
                        <div className="card-row">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="payment-input"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />
                            
                            <input
                                type="password"
                                placeholder="CVV"
                                maxLength="3"
                                className="payment-input"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {paymentMethod === "NetBanking" && (
                    <select className="payment-input">
                        <option value="">Select Bank</option>
                        <option value="SBI">SBI</option>
                        <option value="HDFC">HDFC</option>
                        <option value="ICICI">ICICI</option>
                        <option value="Axis">Axis Bank</option>
                    </select>
                )}

                <button 
                    className="pay-now-btn" 
                    onClick={handlePayment} 
                    disabled={loading || success}
                    style={{ background: success ? "#059669" : "" }}
                >
                    {
                        loading ? (
                            <img src={Loading2} alt="Loading" className="loadings" />
                        ) : success ? (
                            "✓ Payment Successful!"
                        ) : (
                            `Pay ₹${totalAmount}`
                        )
                    }
                </button>

            </div>
        </div>
    );
}

export default Payment;