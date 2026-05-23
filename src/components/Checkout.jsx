import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {

    const location = useLocation();

    const navigate = useNavigate();

    const {

        flight,
        departure,
        destination,
        date,
        selectedSeat,
        passengers

    } = location.state || {};

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");

    const [agree, setAgree] = useState(false);

    const ticketPrice =
        flight.price * passengers;

    const boardingFee =
        299 * passengers;

    const totalAmount =
        ticketPrice + boardingFee;


    const handlePayment = () => {

        if(
            !name ||
            !email ||
            !phone
        ){

            alert(
                "Fill all passenger details"
            );

            return;

        }

        if(!agree){

            alert(
                "Accept Privacy Policy"
            );

            return;

        }


        navigate(
            "/payment",
            {

                state: {

                    flight,
                    departure,
                    destination,
                    date,
                    selectedSeat,
                    passengers,
                    totalAmount,
                    name

                }

            }
        );

    };

    return (

        <div className="checkout-page">


            {/* LEFT */}

            <div className="checkout-left">

                <h1>
                    Passenger Details
                </h1>


                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e)=>
                        setName(e.target.value)
                    }
                />


                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    }
                />


                <input
                    type="number"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e)=>
                        setPhone(e.target.value)
                    }
                />


                <div className="privacy-box">

                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={() =>
                            setAgree(!agree)
                        }
                    />

                    <p>

                        I agree to
                        Privacy Policy
                        and Terms &
                        Conditions

                    </p>

                </div>

            </div>


            {/* RIGHT */}

            <div className="checkout-right">

                <h1>
                    Booking Summary
                </h1>


                <div className="summary-box">

                    <h2>
                        {flight.airline}
                    </h2>

                    <p>
                        {departure} → {destination}
                    </p>

                    <p>
                        Date: {date}
                    </p>

                    <p>
                        Seat: {selectedSeat}
                    </p>

                    <p>
                        Passengers:
                        {passengers}
                    </p>

                </div>


                <div className="price-box">

                    <div className="price-row">

                        <p>
                            Ticket Fare
                        </p>

                        <p>
                            ₹{ticketPrice}
                        </p>

                    </div>


                    <div className="price-row">

                        <p>
                            Boarding Fee
                        </p>

                        <p>
                            ₹{boardingFee}
                        </p>

                    </div>


                    <div className="price-row total-price">

                        <p>
                            Total Amount
                        </p>

                        <p>
                            ₹{totalAmount}
                        </p>

                    </div>

                </div>


                <button

className="payment-btn"

onClick={() => {

navigate(
"/payment",
{

state: {

flight,
departure,
destination,
date,
selectedSeat,
passengers,
totalAmount,
name

}

}

);

}}

>

Proceed To Payment

</button>

            </div>

        </div>

    );

}

export default Checkout;