import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SeatSelection.css";

function SeatSelection() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [permanentlyBookedSeats, setPermanentlyBookedSeats] = useState([]);

    if (!location.state) {
        return <h1 style={{ textAlign: "center", marginTop: "100px" }}>No Flight Selected</h1>;
    }

    const { flight, departure, destination, date, passengers, isboard } = location.state;
    const targetPassengers = Number(passengers);
    const seatsNeeded = targetPassengers - selectedSeats.length;

    // TRUE SEAT PERSISTENCE
    useEffect(() => {
        const allTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        
        // 🚨 BUG FIX: Added optional chaining (?.) so it doesn't crash on old corrupt tickets
        const matchingTickets = allTickets.filter(
            (ticket) => ticket?.flight?.id === flight?.id && ticket.date === date
        );

        const soldSeats = matchingTickets.map(ticket => ticket.selectedSeat);
        const demoBookedSeats = ["1B", "2C", "4A", "5D"];
        setPermanentlyBookedSeats([...new Set([...soldSeats, ...demoBookedSeats])]);
    }, [flight?.id, date]);

    const seatRows = [
        ["1A", "1B", "1C", "1D", "1E"],
        ["2A", "2B", "2C", "2D", "2E"],
        ["3A", "3B", "3C", "3D", "3E"],
        ["4A", "4B", "4C", "4D", "4E"],
        ["5A", "5B", "5C", "5D", "5E"],
        ["6A", "6B", "6C", "6D", "6E"],
        ["7A", "7B", "7C", "7D", "7E"],
        ["8A", "8B", "8C", "8D", "8E"],
        ["9A", "9B", "9C", "9D", "9E"],
        ["10A", "10B", "10C", "10D", "10E"],
        ["11A", "11B", "11C", "11D", "11E"],
        ["12A", "12B", "12C", "12D", "12E"]
    ];

    // DYNAMIC PRICING TIERS
    const calculateTotalSeatPrice = () => {
        let total = 0;
        selectedSeats.forEach(seat => {
            const rowNumber = parseInt(seat.slice(0, -1));
            total += rowNumber <= 3 ? flight.price + 1000 : flight.price;
        });
        return total;
    };

    return (
        <div className="seat-page">
            <div className="seat-top">
                <h1>Select Your Seat</h1>
                <h2>{flight?.airline}</h2>
                <p>{departure} → {destination}</p>
                <p>{date}</p>
                
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "15px" }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>🟦 Premium (Rows 1-3): +₹1000</span>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>⬜ Standard (Rows 4-12): Base Fare</span>
                </div>
            </div>

            <div className="airplane-wrapper">
                <div className="mainplane">
                    
                    <div className="planefront">
                        <div className="frontshape"></div>
                    </div>

                    <div className="plane-body">
                        {seatRows.map((row, rowIndex) => (
                            <div className="seat-row" key={rowIndex}>
                                {row.map((seat, seatIndex) => {
                                    const isBooked = permanentlyBookedSeats.includes(seat);
                                    const isSelected = selectedSeats.includes(seat);
                                    const isPremium = parseInt(seat.slice(0, -1)) <= 3; 

                                    return (
                                        <div key={seat} className="seat-wrapper">
                                            <button
                                                disabled={isBooked || (selectedSeats.length >= targetPassengers && !isSelected)}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setSelectedSeats(selectedSeats.filter((s) => s !== seat));
                                                    } else {
                                                        if (selectedSeats.length < targetPassengers) {
                                                            setSelectedSeats([...selectedSeats, seat]);
                                                        }
                                                    }
                                                }}
                                                className={
                                                    isBooked ? "seat booked-seat" : 
                                                    isSelected ? "seat selected-seat" : 
                                                    isPremium ? "seat premium-seat" : "seat"
                                                }
                                                style={isPremium && !isBooked && !isSelected ? { backgroundColor: "#e0e7ff", color: "#1e3a8a", border: "1px solid #bfdbfe" } : {}}
                                            >
                                                {seat}
                                            </button>
                                            {seatIndex === 2 && <div className="aisle"></div>}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="seat-bottom">
                
                <h2>
                    Selected Seats: <span>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</span>
                </h2>
                
                {seatsNeeded > 0 ? (
                    <p style={{ color: "#d97706", fontWeight: "bold", marginBottom: "15px" }}>
                        Please select {seatsNeeded} more seat(s).
                    </p>
                ) : (
                    <p style={{ color: "#059669", fontWeight: "bold", marginBottom: "15px" }}>
                        All seats selected! Current Fare: ₹{calculateTotalSeatPrice()}
                    </p>
                )}

                <button
                    className="confirm-seat-btn"
                    onClick={() => {
                        if (selectedSeats.length === targetPassengers) {
                            const updatedFlight = { ...flight, price: calculateTotalSeatPrice() / targetPassengers };

                            navigate("/checkout", {
                                state: { flight: updatedFlight, departure, destination, date, selectedSeats, passengers, isboard }
                            });
                        } else {
                            alert(`You must select exactly ${targetPassengers} seats to proceed.`);
                        }
                    }}
                >
                    Confirm Seat
                </button>
                
            </div>
        </div>
    );
}

export default SeatSelection;