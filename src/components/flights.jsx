import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Flights() {

    const navigate = useNavigate();

    const location = useLocation();

    const {
        departure,
        destination,
        date,
        passengers
    } = location.state || {};

    const [sortType, setSortType] = useState("low");

    const [popup, setPopup] = useState(false);

    const [selectedFlight, setSelectedFlight] = useState(null);

    const flightsData = [

        {
            airline: "X Airlines",
            time: "08:30 AM",
            duration: "2h 10m",
            durationValue: 130,
            price: 4599,
            rating: 4.8
        },

        {
            airline: "Air India",
            time: "11:45 AM",
            duration: "2h 25m",
            durationValue: 145,
            price: 5200,
            rating: 4.5
        },

        {
            airline: "IndiGo",
            time: "02:15 PM",
            duration: "2h 05m",
            durationValue: 125,
            price: 3999,
            rating: 4.2
        },

        {
            airline: "Vistara",
            time: "06:00 PM",
            duration: "2h 30m",
            durationValue: 150,
            price: 6100,
            rating: 4.9
        }

    ];

    const sortedFlights = [...flightsData].sort((a, b) => {

        if (sortType === "low") {

            return a.price - b.price;

        }

        if (sortType === "high") {

            return b.price - a.price;

        }

        if (sortType === "rating") {

            return b.rating - a.rating;

        }

        if (sortType === "duration") {

            return a.durationValue - b.durationValue;

        }

    });

    return (

        <div className="flights">

            {/* TOP NAV */}

            <nav className="flightnav">

                <div>

                    <h1 className="flighth1">
                        Available Flights
                    </h1>

                    <p className="flight-subtext">
                        Best flights for your journey
                    </p>

                </div>

                <div className="sort-container">

                    <label className="sort-label">
                        Sort By
                    </label>

                    <select
                        className="price"
                        value={sortType}
                        onChange={(e) =>
                            setSortType(e.target.value)
                        }
                    >

                        <option value="low">
                            Lowest Price
                        </option>

                        <option value="high">
                            Highest Price
                        </option>

                        <option value="rating">
                            Highest Rating
                        </option>

                        <option value="duration">
                            Shortest Duration
                        </option>

                    </select>

                </div>

            </nav>


            {/* SEARCH DETAILS */}

            <div className="search-details">

                <h2>
                    {departure} → {destination}
                </h2>

                <p>
                    Date: {date}
                </p>

                <p>
                    Passengers: {passengers}
                </p>

            </div>


            {/* FLIGHT CARDS */}

            <div className="flights-list">

                {

                    sortedFlights.map((flight, index) => (

                        <div
                            className="flight-card"
                            key={index}
                        >

                            <div className="flight-card-top">

                                <div>

                                    <h2 className="airline-name">
                                        {flight.airline}
                                    </h2>

                                    <p className="flight-route">
                                        {departure} → {destination}
                                    </p>

                                </div>

                                <h2 className="flight-price">
                                    ₹{flight.price}
                                </h2>

                            </div>


                            <div className="flight-card-middle">

                                <div className="flight-info-box">

                                    <h3>
                                        Departure
                                    </h3>

                                    <p>
                                        {flight.time}
                                    </p>

                                </div>


                                <div className="flight-info-box">

                                    <h3>
                                        Duration
                                    </h3>

                                    <p>
                                        {flight.duration}
                                    </p>

                                </div>


                                <div className="flight-info-box">

                                    <h3>
                                        Rating
                                    </h3>

                                    <p>
                                        ⭐ {flight.rating}
                                    </p>

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

                    ))

                }

            </div>


            {/* POPUP */}

            {

                popup && (

                    <div className="popup">

                        <div className="popup-content">

                            <h2>
                                Online Boarding Pass?
                            </h2>

                            <p>
                                Do you want seat selection?
                            </p>

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
                                                passengers

                                            }

                                        });

                                    }}

                                >

                                    Yes

                                </button>


                                <button

                                    className="popup-no"

                                    onClick={() => {

                                        setPopup(false);

                                    }}

                                >

                                    No

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default Flights;