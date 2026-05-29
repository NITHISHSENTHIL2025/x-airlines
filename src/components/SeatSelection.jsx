import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SeatSelection.css"

function SeatSelection() {

    const navigate = useNavigate();

    const location = useLocation();

    const {
        flight,
        departure,
        destination,
        date,
        passengers,
        isboard
    } = location.state || {};


    // MULTIPLE SELECTED SEATS
    const [selectedSeats, setSelectedSeats] = useState([]);


    // BOOKED SEATS
    const bookedSeats = [

        "1B",
        "2C",
        "4A",
        "5D"

    ];



    // SEAT ROWS
    const seats = [

        ["1A", "1B", "1C", "1D"],
        ["2A", "2B", "2C", "2D"],
        ["3A", "3B", "3C", "3D"],
        ["4A", "4B", "4C", "4D"],
        ["5A", "5B", "5C", "5D"],
        ["6A", "6B", "6C", "6D"]

    ];



    return (

        <div className="seat-page">

            {/* TOP */}

            <div className="seat-top">

                <h1>
                    Select Your Seat
                </h1>

                <h2>
                    {flight?.airline}
                </h2>

                <p>
                    {departure} → {destination}
                </p>

                <p>
                    {date}
                </p>

            </div>



            {/* AIRPLANE */}

            <div className="airplane-wrapper">


                {/* FRONT */}

                <div className="plane-front">

                    <div className="cockpit-glass"></div>

                    <div className="cockpit-glass2"></div>

                </div>



                {/* BODY */}

                <div className="plane-body">

                    {

                        seats.map((row, rowIndex) => (

                            <div
                                className="seat-row"
                                key={rowIndex}
                            >

                                {

                                    row.map((seat, seatIndex) => {

                                        // BOOKED CHECK
                                        const isBooked =
                                            bookedSeats.includes(seat);

                                        // SELECTED CHECK
                                        const isSelected =
                                            selectedSeats.includes(seat);


                                        return (

                                            <div
                                                key={seat}
                                                className="seat-wrapper"
                                            >

                                                <button

                                                    disabled={

                                                        isBooked ||

                                                        (
                                                            selectedSeats.length >= passengers &&
                                                            !selectedSeats.includes(seat)
                                                        )

                                                    }

                                                    onClick={() => {

                                                        // REMOVE SEAT
                                                        if (
                                                            selectedSeats.includes(seat)
                                                        ) {

                                                            setSelectedSeats(

                                                                selectedSeats.filter(

                                                                    (s) => s !== seat

                                                                )

                                                            );

                                                        }

                                                        // ADD SEAT
                                                        else {

                                                            if (selectedSeats.length < passengers) {

                                                                setSelectedSeats([

                                                                    ...selectedSeats,
                                                                    seat

                                                                ]);

                                                            }

                                                            else {

                                                                alert(
                                                                    `You can only select ${passengers} seats`
                                                                );


                                                            }

                                                        }

                                                    }}


                                                    className={

                                                        isBooked
                                                            ? "seat booked-seat"

                                                            : isSelected
                                                                ? "seat selected-seat"

                                                                : "seat"

                                                    }

                                                >

                                                    {seat}

                                                </button>



                                                {/* AISLE */}

                                                {

                                                    seatIndex === 1 &&

                                                    <div className="aisle"></div>

                                                }

                                            </div>

                                        );

                                    })

                                }

                            </div>

                        ))

                    }

                </div>

            </div>



            {/* BOTTOM */}

            <div className="seat-bottom">

                <h2>

                    Selected Seats :

                    <span>

                        {

                            selectedSeats.length > 0

                                ?

                                selectedSeats.join(", ")

                                :

                                " None"

                        }

                    </span>

                </h2>



                <button

                    className="confirm-seat-btn"

                    onClick={() => {

                        // CHECK SEAT SELECTED
                        if (selectedSeats.length > 0) {

                            navigate(
                                "/checkout",
                                {

                                    state: {

                                        flight,
                                        departure,
                                        destination,
                                        date,

                                        // MULTIPLE SEATS
                                        selectedSeats,

                                        passengers,
                                        isboard

                                    }

                                }
                            );

                        }

                        else {

                            alert(
                                "Please select at least one seat"
                            );

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