import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SeatSelection.css"

function SeatSelection() {

    const navigate = useNavigate();

    const location = useLocation();
    if (!location.state) {

    return (

        <h1
            style={{
                textAlign:"center",
                marginTop:"100px"
            }}
        >
            No Flight Selected
        </h1>

    );

}

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


    const leftSeats = [
  ["1A", "1B", "1C"],
  ["2A", "2B", "2C"],
  ["3A", "3B", "3C"],
  ["4A", "4B", "4C"],
  ["5A", "5B", "5C"],
  ["6A", "6B", "6C"],
  ["7A", "7B", "7C"],
  ["8A", "8B", "8C"],
  ["9A", "9B", "9C"],
  ["10A", "10B", "10C"],
  ["11A", "11B", "11C"],
  ["12A", "12B", "12C"]
];
const rightSeats = [
  ["1D", "1E"],
  ["2D", "2E"],
  ["3D", "3E"],
  ["4D", "4E"],
  ["5D", "5E"],
  ["6D", "6E"],
  ["7D", "7E"],
  ["8D", "8E"],
  ["9D", "9E"],
  ["10D", "10E"],
  ["11D", "11E"],
  ["12D", "12E"]
];
    // SEAT ROWS
    const seatRows = [

        ["1A", "1B", "1C", "1D","1E"],
        ["2A", "2B", "2C", "2D","2E"],
        ["3A", "3B", "3C", "3D","3E"],
        ["4A", "4B", "4C", "4D","4E"],
        ["5A", "5B", "5C", "5D","5E"],
        ["6A", "6B", "6C", "6D","6E"],
        ["7A", "7B", "7C", "7D","7E"],
        ["8A", "8B", "8C", "8D","8E"],
        ["9A", "9B", "9C", "9D","9E"],
        ["10A", "10B", "10C", "10D","10E"],
        ["11A", "11B", "11C", "11D","11E"],
        ["12A", "12B", "12C", "12D","12E"]

    ];

    const seatsLeft = seatRows.map((row) => row.slice(0, 3));
    const seatsRight = seatRows.map((row) => row.slice(3));

    const renderSeat = (seat) => {
        const isBooked = bookedSeats.includes(seat);
        const isSelected = selectedSeats.includes(seat);

        return (
            <div key={seat} className="seat-wrapper">
                <button
                    disabled={
                        isBooked ||
                        (
                            selectedSeats.length >= passengers &&
                            !selectedSeats.includes(seat)
                        )
                    }
                    onClick={() => {
                        if (isSelected) {
                            setSelectedSeats(
                                selectedSeats.filter((s) => s !== seat)
                            );
                        } else {
                            if (selectedSeats.length < passengers) {
                                setSelectedSeats([...selectedSeats, seat]);
                            } else {
                                alert(`You can only select ${passengers} seats`);
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
            </div>
        );
    };



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


                
                <div className="mainplane">
                <div className="planefront">
                    <div className="frontshape"></div>

                </div>

                {/* BODY */}

                <div className="plane-body">

                    {

                        leftSeats.map((row, rowIndex) => (

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

                                                    seatIndex === 2 &&

                                                    <div className="aisle"></div>

                                                }

                                            </div>

                                        );

                                    })

                                }

                            </div>

                        ))

                    }</div>

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