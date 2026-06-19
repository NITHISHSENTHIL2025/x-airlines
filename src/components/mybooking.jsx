import { useNavigate } from "react-router-dom";
import Ticket from "./ticket";
import "./mybookings.css";

function MyBookings() {
    const navigate = useNavigate();
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const cu = JSON.parse(localStorage.getItem("currentUser"));

    // Guard against unauthenticated access
    if (!cu?.email) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h1>Please Login</h1>
                <p>You must be logged in to view your bookings.</p>
            </div>
        );
    }

    const myTickets = tickets.filter(ticket => ticket.current === cu.email);

    return (
        <div className="bookings">
            {myTickets.length > 0 ? (
                myTickets.map((ticket, index) => (
                    <Ticket key={ticket.pnr + ticket.selectedSeat} ticketData={ticket} />
                ))
            ) : (
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <h1>No Bookings Found</h1>
                    <p style={{ marginTop: "10px", color: "gray" }}>You haven't booked any flights yet.</p>
                    <button 
                        onClick={() => navigate("/")} 
                        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer", background: "#111827", color: "white", borderRadius: "8px" }}
                    >
                        Search Flights
                    </button>
                </div>
            )}
        </div>
    );
}

export default MyBookings;