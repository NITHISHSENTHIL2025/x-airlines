import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {

    const location = useLocation();
    const navigate = useNavigate();

    // NO DATA

    if (!location.state) {

        return (

            <div
                style={{
                    textAlign: "center",
                    marginTop: "100px"
                }}
            >

                <h1>
                    No Booking Found
                </h1>

            </div>

        );

    }

    // GET DATA

    const {

        flight,
        departure,
        destination,
        date,
        selectedSeats = [],
        passengers = 1,
        isboard

    } = location.state;

    // PASSENGER DETAILS

    const [passengerDetails, setPassengerDetails] = useState(

        Array.from(

            { length: passengers },

            () => ({

                name: "",
                age: "",
                gender: ""

            })

        )

    );

    // POLICY

    const [agree, setAgree] = useState(false);

    // HANDLE INPUTS

    const handlePassengerChange = (

        index,
        field,
        value

    ) => {

        const updatedPassengers = [

            ...passengerDetails

        ];

        updatedPassengers[index][field] =
            value;

        setPassengerDetails(
            updatedPassengers
        );

    };

    // PRICE

    const ticketPrice =
        (flight?.price || 0) * passengers;

    const boardingFee =
        isboard
        ? 299 * passengers
        : 0;

    const totalAmount =
        ticketPrice + boardingFee;

    // PAYMENT

    const handlePayment = () => {

        // CHECK EMPTY FIELDS

        const emptyField = passengerDetails.some(

            (passenger) =>

                !passenger.name ||
                !passenger.age ||
                !passenger.gender

        );

        if (emptyField) {

            alert(
                "Fill all passenger details"
            );

            return;

        }

        // CHECK POLICY

        if (!agree) {

            alert(
                "Accept Privacy Policy"
            );

            return;

        }

        // OLD TICKETS

        const oldTickets = JSON.parse(

            localStorage.getItem("tickets")

        ) || [];

        // CREATE SEPARATE TICKETS

        passengerDetails.forEach(

            (passenger, index) => {

                const singleTicket = {

                    flight,
                    departure,
                    destination,
                    date,

                    passengerName:
                    passenger.name,

                    passengerAge:
                    passenger.age,

                    passengerGender:
                    passenger.gender,

                    selectedSeat:
                    selectedSeats[index],

                    passengers: 1,

                    totalAmount:
                    flight.price +

                    (isboard ? 299 : 0)

                };

                oldTickets.push(
                    singleTicket
                );

            }

        );

        // SAVE

        localStorage.setItem(

            "tickets",

            JSON.stringify(oldTickets)

        );

        // NAVIGATE

        navigate(

            "/payment",

            {

                state: {

                    flight,
                    departure,
                    destination,
                    date,
                    passengerDetails,
                    selectedSeats,
                    passengers,
                    totalAmount

                }

            }

        );

    };

    return (

        <div className="checkout-page">

            {/* LEFT */}

            <div className="checkout-top">

                <h1 className="passengerd">
                    Passenger Details
                </h1>

                {

                    passengerDetails.map(

                        (passenger, index) => (

                            <div
                                className="passenger-card"
                                key={index}
                            >

                                <h2>

                                    Passenger
                                    {" "}
                                    {index + 1}

                                </h2>

                                {/* NAME */}

                                <input

                                    type="text"

                                    placeholder="Full Name"

                                    value={passenger.name}

                                    onChange={(e) =>

                                        handlePassengerChange(

                                            index,
                                            "name",
                                            e.target.value

                                        )

                                    }

                                />

                                {/* AGE */}

                                <input

                                    type="number"

                                    placeholder="Age"

                                    value={passenger.age}

                                    onChange={(e) =>

                                        handlePassengerChange(

                                            index,
                                            "age",
                                            e.target.value

                                        )

                                    }

                                />

                                {/* GENDER */}

                                <select

                                    value={passenger.gender}

                                    onChange={(e) =>

                                        handlePassengerChange(

                                            index,
                                            "gender",
                                            e.target.value

                                        )

                                    }

                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        )

                    )

                }

                {/* POLICY */}

                <div className="privacy-box">

                    <input

                        type="checkbox"

                        checked={agree}

                        onChange={() =>
                            setAgree(!agree)
                        }

                    />

                    <p>

                        I agree to Privacy Policy
                        and Terms & Conditions

                    </p>

                </div>

            </div>

            {/* RIGHT */}

            <div className="checkout-final">

                <h1>
                    Booking Summary
                </h1>

                <h2 className="flightnamesummary">

                    {flight?.airline || "Flight"}
                    {" "}
                    Airlines

                </h2>

                <div className="summary-box">

                    <p>

                        {departure}
                        {" → "}
                        {destination}

                    </p>

                    <p>

                        Date:
                        {" "}
                        {date}

                    </p>

                    <p>

                        Seats:
                        {" "}

                        {

                            selectedSeats.length > 0

                            ? selectedSeats.join(", ")

                            : "No Seats"

                        }

                    </p>

                    <p>

                        Passengers:
                        {" "}
                        {passengers}

                    </p>

                </div>

                {/* PRICE */}

                <div className="price-box">

                    <div className="price-row">

                        <p>

                            Ticket Fare :
                            {" "}
                            ₹{ticketPrice}

                        </p>

                    </div>

                    <div className="price-row">

                        <p>

                            Boarding Fee :
                            {" "}
                            ₹{boardingFee}

                        </p>

                    </div>

                </div>

                <p className="totalamt">

                    Total Amount :
                    {" "}
                    ₹{totalAmount}

                </p>

                {/* BUTTON */}

                <button

                    className="payment-btn"

                    onClick={handlePayment}

                >

                    Proceed To Payment

                </button>

            </div>

        </div>

    );

}

export default Checkout;