import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import air from "../assets/airs.png";
import Loading2 from "../assets/loader.svg";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const title = currentUser ? `Welcome, ${currentUser.firstName}!` : "X Airlines";

    // STATES
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState("");

    const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
    
    const [load, setLoad] = useState(false);
    const [popup, setPopup] = useState("");

    // NEW: State for dynamically loaded places
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [placesLoading, setPlacesLoading] = useState(true);

    // FETCH PLACES FROM JSON
    useEffect(() => {
        fetch('/places.json')
            .then(response => response.json())
            .then(data => {
                setPopularPlaces(data);
                setPlacesLoading(false);
            })
            .catch(error => console.error("Error loading places:", error));
    }, []);

    // NEW FEATURE: Auto-Swap Departure and Destination
    const handleSwap = () => {
        const temp = departure;
        setDeparture(destination);
        setDestination(temp);
    };

    // VALIDATION
    const validDeparture = popularPlaces.some(
        place => place.toLowerCase() === departure.toLowerCase()
    );

    const validDestination = popularPlaces.some(
        place => place.toLowerCase() === destination.toLowerCase()
    );

    const today = new Date().toISOString().split("T")[0];

    return (
        <main className="home-main">
            <div className="home-main-content">
                <div className="home-search-nav-container">
                    <h2 className="home-subtitle">{title}</h2>
                </div>

                <div className="home-main-content-search">
                    <div className="home-search-container">

                        {/* DEPARTURE */}
                        <div className="autocomplete">
                            <input
                                type="text"
                                placeholder={placesLoading ? "Loading cities..." : "Departure"}
                                disabled={placesLoading}
                                className="home-search1"
                                value={departure}
                                onChange={(e) => {
                                    setDeparture(e.target.value);
                                    setShowDepartureDropdown(true);
                                }}
                                onBlur={() => setShowDepartureDropdown(false)}
                            />

                            {showDepartureDropdown && departure && (
                                <div className="autocomplete-dropdown">
                                    {popularPlaces
                                        .filter((place) => place.toLowerCase().includes(departure.toLowerCase()))
                                        .slice(0, 100)
                                        .map((place, index) => (
                                            <div
                                                key={index}
                                                className="autocomplete-item"
                                                // UX FIX: onMouseDown fires before onBlur, making selection flawless
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); 
                                                    setDeparture(place);
                                                    setShowDepartureDropdown(false);
                                                }}
                                            >
                                                {place}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* NEW FEATURE: SWAP BUTTON */}
                        <button 
                            className="swap-btn" 
                            onClick={handleSwap}
                            title="Swap Departure and Destination"
                            style={{
                                background: "none", border: "none", fontSize: "24px", 
                                cursor: "pointer", color: "#111827", padding: "0 10px",
                                transition: "transform 0.3s ease"
                            }}
                            onMouseOver={(e) => e.target.style.transform = "scale(1.2)"}
                            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                        >
                            ⇄
                        </button>

                        {/* DESTINATION */}
                        <div className="autocomplete">
                            <input
                                type="text"
                                placeholder={placesLoading ? "Loading cities..." : "Destination"}
                                disabled={placesLoading}
                                className="home-search2"
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value);
                                    setShowDestinationDropdown(true);
                                }}
                                onBlur={() => setShowDestinationDropdown(false)}
                            />

                            {showDestinationDropdown && destination && (
                                <div className="autocomplete-dropdown">
                                    {popularPlaces
                                        .filter((place) => place.toLowerCase().includes(destination.toLowerCase()))
                                        .slice(0, 100)
                                        .map((place, index) => (
                                            <div
                                                key={index}
                                                className="autocomplete-item"
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    setDestination(place);
                                                    setShowDestinationDropdown(false);
                                                }}
                                            >
                                                {place}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* DATE */}
                        <input
                            type="date"
                            className="home-search3"
                            value={date}
                            min={today}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        {/* PASSENGERS */}
                        <input
                            type="number"
                            min="1"
                            max="20"
                            placeholder="Passengers"
                            className="home-search4"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                        />
                    </div>

                    <p className="home-search-text">
                        Your Journey Starts With X Airlines. Book domestic and international flights at the best prices.
                    </p>

                    <button
                        className="home-search-button"
                        onClick={() => {
                            if (currentUser) {
                                if (departure && destination && date && passengers) {
                                    if (
                                        validDeparture &&
                                        validDestination &&
                                        departure.toLowerCase() !== destination.toLowerCase() &&
                                        passengers > 0 &&
                                        passengers <= 20
                                    ) {
                                        setLoad(true);
                                        
                                            navigate("/flights", {
                                                state: {
                                                    departure,
                                                    destination,
                                                    date,
                                                    passengers,
                                                    name: currentUser.firstName
                                                }
                                            });
                                        
                                    } else if (departure.toLowerCase() === destination.toLowerCase()) {
                                        setPopup("Departure and destination cannot be the same.");
                                    } else {
                                        setPopup("No flights available for selected route.");
                                    }
                                } else {
                                    setPopup("Please enter all details.");
                                }
                            } else {
                                window.alert("Please Login First");
                            }
                        }}
                    >
                       Search ✈︎ 
                    </button>

                    <img src={air} alt="Airplane" className="home-main2-image" />
                </div>
            </div>

            {/* WHY X AIRLINES */}
            <div className="home-main3">
                <div className="home-main3-head">
                    <h2 className="home-main3-title">Why X Airlines?</h2>
                </div>

                <div className="home3mainbox">
                    <div className="home3mainbox1">
                        <h3 className="home3mainbox-title">Best Prices</h3>
                        <p className="home3mainbox-text">
                            We offer competitive prices on flights to destinations worldwide, ensuring you get the best deal for your travel plans.
                        </p>
                    </div>

                    <div className="home3mainbox2">
                        <h3 className="home3mainbox-title">Extensive Network</h3>
                        <p className="home3mainbox-text">
                            With a vast network of destinations, we connect you to cities around the globe, making it easy to find the perfect flight.
                        </p>
                    </div>

                    <div className="home3mainbox3">
                        <h3 className="home3mainbox-title">Exceptional Service</h3>
                        <p className="home3mainbox-text">
                            Our dedicated customer service team is here to assist you every step of the way, ensuring a smooth travel experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* POPUP */}
            {popup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>{popup}</p>
                        <button onClick={() => setPopup("")}>OK</button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Home;