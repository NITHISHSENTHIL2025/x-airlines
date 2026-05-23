import { Link } from "react-router-dom";
import air from "../assets/airs.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    const title = currentUser
        ? `Welcome, ${currentUser.firstName}!`
        : "X Airlines";

    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState("");

    const [showDepartureDropdown,
        setShowDepartureDropdown] =
        useState(false);

    const [showDestinationDropdown,
        setShowDestinationDropdown] =
        useState(false);


    const popularPlaces = [

        "Hyderabad",
        "Chennai",
        "Bangalore",
        "Mumbai",
        "Delhi",
        "Kolkata",
        "Pune",
        "Ahmedabad",
        "Goa",
        "Kochi",
        "Jaipur",
        "Lucknow",
        "Visakhapatnam",
        "Coimbatore",
        "Madurai",
        "Tirupati",
        "Vijayawada",
        "Patna",
        "Bhubaneswar",
        "Nagpur",
        "Indore",
        "Surat",
        "Amritsar",
        "Varanasi",
        "Srinagar",
        "Leh",
        "Chandigarh",
        "Dehradun",
        "Guwahati",
        "Ranchi",
        "Raipur",
        "Trivandrum",
        "Mangalore",
        "Mysore",
        "Hubli",
        "Rajahmundry",
        "Salem",
        "Pondicherry",
        "Shillong",
        "Agra",

        "Dubai",
        "Singapore",
        "London",
        "Paris",
        "New York",
        "Los Angeles",
        "Toronto",
        "Sydney",
        "Melbourne",
        "Tokyo",
        "Seoul",
        "Bangkok",
        "Kuala Lumpur",
        "Doha",
        "Abu Dhabi",
        "Istanbul",
        "Frankfurt",
        "Rome",
        "Barcelona",
        "Amsterdam",
        "Zurich",
        "Vienna",
        "Munich",
        "Moscow",
        "Beijing",
        "Shanghai",
        "Hong Kong",
        "Jakarta",
        "Bali",
        "Phuket",
        "Colombo",
        "Male",
        "Kathmandu",
        "Auckland",
        "San Francisco",
        "Chicago",
        "Washington",
        "Boston",
        "Las Vegas",
        "Miami",

        "Osaka",
        "Manila",
        "Hanoi",
        "Ho Chi Minh City",
        "Cairo",
        "Johannesburg",
        "Nairobi",
        "Riyadh",
        "Jeddah",
        "Kuwait City",
        "Muscat",
        "Tehran",
        "Karachi",
        "Lahore",
        "Dhaka",
        "Brussels",
        "Stockholm",
        "Copenhagen",
        "Helsinki",
        "Dublin",
        "Prague",
        "Budapest",
        "Warsaw",
        "Athens",
        "Lisbon",
        "Venice",
        "Geneva",
        "Luxembourg",
        "Vancouver",
        "Montreal"

    ];


    const validDeparture =
        popularPlaces.some(
            place =>
                place.toLowerCase()
                ===
                departure.toLowerCase()
        );

    const validDestination =
        popularPlaces.some(
            place =>
                place.toLowerCase()
                ===
                destination.toLowerCase()
        );
        const [popup, setPopup] = useState("");


    return (

        <>

            <main className="home-main">

                <div className="home-main-content">

                    <div className="home-search-nav-container">

                        <h2 className="home-subtitle">
                            {title}
                        </h2>

                    </div>


                    <div className="home-main-content-search">

                        <div className="home-search-container">


                            {/* DEPARTURE */}


                            <div className="autocomplete">

                                <input
                                    type="text"
                                    placeholder="Departure"
                                    className="home-search1"
                                    value={departure}

                                    onChange={(e) => {

                                        setDeparture(
                                            e.target.value
                                        );

                                        setShowDepartureDropdown(true);

                                    }}
                                />


                                {

                                    showDepartureDropdown
                                    &&
                                    departure && (

                                        <div className="autocomplete-dropdown">

                                            {

                                                popularPlaces

                                                    .filter((place) =>

                                                        place
                                                            .toLowerCase()
                                                            .includes(
                                                                departure.toLowerCase()
                                                            )

                                                    )

                                                    .slice(0, 100)

                                                    .map((place, index) => (

                                                        <div

                                                            key={index}

                                                            className="autocomplete-item"

                                                            onClick={() => {

                                                                setDeparture(place);

                                                                setShowDepartureDropdown(false);

                                                            }}

                                                        >

                                                            {place}

                                                        </div>

                                                    ))

                                            }

                                        </div>

                                    )

                                }

                            </div>



                            {/* DESTINATION */}



                            <div className="autocomplete">

                                <input
                                    type="text"
                                    placeholder="Destination"
                                    className="home-search2"
                                    value={destination}

                                    onChange={(e) => {

                                        setDestination(
                                            e.target.value
                                        );

                                        setShowDestinationDropdown(true);

                                    }}
                                />


                                {

                                    showDestinationDropdown
                                    &&
                                    destination && (

                                        <div className="autocomplete-dropdown">

                                            {

                                                popularPlaces

                                                    .filter((place) =>

                                                        place
                                                            .toLowerCase()
                                                            .includes(
                                                                destination.toLowerCase()
                                                            )

                                                    )

                                                    .slice(0, 100)

                                                    .map((place, index) => (

                                                        <div

                                                            key={index}

                                                            className="autocomplete-item"

                                                            onClick={() => {

                                                                setDestination(place);

                                                                setShowDestinationDropdown(false);

                                                            }}

                                                        >

                                                            {place}

                                                        </div>

                                                    ))

                                            }

                                        </div>

                                    )

                                }

                            </div>



                            {/* DATE */}



                            <input
                                type="date"
                                className="home-search3"
                                value={date}

                                onChange={(e) =>
                                    setDate(e.target.value)
                                }
                            />



                            {/* PASSENGERS */}



                            <input
                                type="number"
                                placeholder="Passengers"
                                className="home-search4"
                                value={passengers}

                                onChange={(e) =>
                                    setPassengers(e.target.value)
                                }
                            />

                        </div>



                        <p className="home-search-text">

                            Your Journey Starts With X Airlines.
                            Book domestic and international flights
                            at the best prices.

                        </p>



                        <button

                            className="home-search-button"

                            onClick={() => {

                                if (

                                    departure
                                    &&
                                    destination
                                    &&
                                    date
                                    &&
                                    passengers

                                ) {

                                    if (

                                        validDeparture
                                        &&
                                        validDestination
                                        &&
                                        departure !== destination
                                        &&
                                        passengers > 0
                                        &&
                                        passengers <= 20

                                    ) {

                                        navigate("/flights", {

                                            state: {

                                                departure,
                                                destination,
                                                date,
                                                passengers

                                            }

                                        });

                                    }

                                    else {

                                        setPopup("No flights available");

                                    }

                                }

                                else {

                                    setPopup("Please enter all details");

                                }

                            }}

                        >

                            ✈︎

                        </button>



                        <img
                            src={air}
                            alt="Airplane"
                            className="home-main2-image"
                        />

                    </div>

                </div>



                {/* WHY X AIRLINES */}



                <div className="home-main3">

                    <div className="home-main3-head">

                        <h2 className="home-main3-title">

                            Why X Airlines?

                        </h2>

                    </div>



                    <div className="home3mainbox">

                        <div className="home3mainbox1">

                            <h3 className="home3mainbox-title">

                                Best Prices

                            </h3>

                            <p className="home3mainbox-text">

                                We offer competitive prices on flights
                                to destinations worldwide, ensuring you
                                get the best deal for your travel plans.

                            </p>

                        </div>



                        <div className="home3mainbox2">

                            <h3 className="home3mainbox-title">

                                Extensive Network

                            </h3>

                            <p className="home3mainbox-text">

                                With a vast network of destinations,
                                we connect you to cities around the globe,
                                making it easy to find the perfect flight
                                for your next adventure.

                            </p>

                        </div>



                        <div className="home3mainbox3">

                            <h3 className="home3mainbox-title">

                                Exceptional Service

                            </h3>

                            <p className="home3mainbox-text">

                                Our dedicated customer service team is
                                here to assist you every step of the way,
                                ensuring a smooth and enjoyable travel
                                experience from booking to arrival.

                            </p>

                        </div>

                    </div>

                </div>
                {

popup && (

<div className="popup">

    <div className="popup-content">

        <p>{popup}</p>

        <button
        onClick={() =>
        setPopup("")
        }
        >

        OK

        </button>

    </div>

</div>

)

}

            </main>

        </>

    );

}

export default Home;