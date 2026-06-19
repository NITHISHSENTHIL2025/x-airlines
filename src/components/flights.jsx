import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./flights.css";

function Flights() {
    const navigate = useNavigate();
    const location = useLocation();

    // Verification check to make sure search criteria state exists
    if (!location.state) {
        return (
            <h1 style={{ textAlign: "center", marginTop: "100px" }}>
                Search Flights First
            </h1>
        );
    }

    const {
        departure,
        destination,
        date,
        passengers,
        name
    } = location.state || {};

    // UI and Interactive Tracking States
    const [sortType, setSortType] = useState("low");
    const [popup, setPopup] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    
    // Core Dynamic Fetch Dataset States
    const [flightsData, setFlightsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH & DYNAMIC LOCATION INTERACTION LAYER
    useEffect(() => {
        setLoading(true);
        // Introducing mock network server delay to capture loading sequence
        const networkTimeout = setTimeout(() => {
            fetch('/flights.json')
                .then(response => response.json())
                .then(data => {
                    // Filter down the massive dataset matrix matching exact routing points
                    const filteredRoutes = data.filter(
                        flight => 
                            flight.from.toLowerCase().trim() === departure.toLowerCase().trim() && 
                            flight.to.toLowerCase().trim() === destination.toLowerCase().trim()
                    );
                    
                    setFlightsData(filteredRoutes);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Critical error parsing remote data array:", error);
                    setLoading(false);
                });
        }, 1200);

        return () => clearTimeout(networkTimeout);
    }, [departure, destination]);

    // PRE-RENDER SORTING SYSTEM MATRIX
    const sortedFlights = [...flightsData].sort((a, b) => {
        if (sortType === "low") return a.price - b.price;
        if (sortType === "high") return b.price - a.price;
        if (sortType === "rating") return b.rating - a.rating;
        if (sortType === "duration") return a.durationValue - b.durationValue;
        return 0;
    });

    // VIEW LAYER: LOADING ENGINE
    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "150px" }}>
                <h2 style={{ fontSize: "28px", color: "#111827", fontWeight: "700" }}>
                    Searching for best flights...
                </h2>
                <p style={{ color: "#6b7280", marginTop: "12px", fontSize: "16px" }}>
                    Scanning route logs from <strong>{departure}</strong> to <strong>{destination}</strong>
                </p>
            </div>
        );
    }

    // VIEW LAYER: ROUTE EXCLUSION STATE (FALLBACK)
    if (!loading && flightsData.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "150px", padding: "20px" }}>
                <h1 style={{ fontSize: "38px", color: "#111827", fontWeight: "800" }}>No Flights Available</h1>
                <p style={{ color: "#6b7280", marginTop: "12px", fontSize: "18px" }}>
                    We currently don't have listed schedules running from <strong>{departure}</strong> to <strong>{destination}</strong>.
                </p>
                <button 
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: "25px", padding: "14px 30px", background: "linear-gradient(135deg, #374151, #111827)", 
                        color: "white", borderRadius: "12px", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer"
                    }}
                >
                    Modify Search Parameters
                </button>
            </div>
        );
    }

    // VIEW LAYER: DATA-RENDER LAYER
    return (
        <div className="flights">
            {/* TOP NAVIGATION SEGMENT */}
            <nav className="flightnav">
                <div>
                    <h1 className="flighth1">Available Flights</h1>
                    <p className="flight-subtext">Best flights found matching your target search</p>
                </div>

                <div className="sort-container">
                    <label className="sort-label">Sort By</label>
                    <select
                        className="price"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="low">Lowest Price</option>
                        <option value="high">Highest Price</option>
                        <option value="rating">Highest Rating</option>
                        <option value="duration">Shortest Duration</option>
                    </select>
                </div>
            </nav>

            {/* FLIGHT COMBINATIONS BRIEF */}
            <div className="search-details">
                <h2>{departure} → {destination}</h2>
                <p>Date of Flight: {date}</p>
                <p>Total Booked Tickets: {passengers}</p>
                
                {/* NEW FEATURE: AVAILABLE FLIGHTS COUNT */}
                <h3 style={{ marginTop: "15px", color: "#111827" }}>
                    Available flights on {date} : {sortedFlights.length} only
                </h3>
            </div>

            {/* ITERATED FLIGHT MATRIX */}
            <div className="flights-list">
                {sortedFlights.map((flight) => (
                    <div className="flight-card" key={flight.id}>
                        <div className="flight-card-top">
                            <div>
                                <h2 className="airline-name">{flight.airline}</h2>
                                <p className="flight-route">
                                    {flight.from} → {flight.to}
                                </p>
                            </div>
                            <h2 className="flight-price">₹{flight.price}</h2>
                        </div>

                        <div className="flight-card-middle">
                            <div className="flight-info-box">
                                <h3>Departure</h3>
                                <p>{flight.time}</p>
                            </div>

                            <div className="flight-info-box">
                                <h3>Duration</h3>
                                <p>{flight.duration}</p>
                            </div>

                            <div className="flight-info-box">
                                <h3>Rating</h3>
                                <p>⭐ {flight.rating}</p>
                            </div>
                        </div>

                        <div className="flight-card-bottom">
                            <button
                                className="book-flight-btn"
                                onClick={() => {
                                    setPopup(true);
                                    setSelectedFlight(flight);
                                }}
                            >
                                Book Flight
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* SEAT OPT-IN COMPONENT POPUP LAYER */}
            {popup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Online Boarding Pass?</h2>
                        <p>Would you like to pre-select your cabin layout seats?</p>
                        
                        <div className="popup-buttons">
                            <button
                                className="popup-yes"
                                onClick={() => {
                                    navigate("/seats", {
                                        state: {
                                            flight: selectedFlight,
                                            departure,
                                            destination,
                                            date,
                                            passengers,
                                            isboard: true
                                        }
                                    });
                                }}
                            >
                                Yes
                            </button>

                            <button
                                className="popup-no"
                                onClick={() => {
                                    navigate("/checkout", {
                                        state: {
                                            flight: selectedFlight,
                                            departure,
                                            destination,
                                            date,
                                            passengers,
                                            isboard: false
                                        }
                                    });
                                }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Flights;