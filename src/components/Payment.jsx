import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./payment.css"
import Loading2 from "../assets/loader.svg"
import { useEffect } from "react";
import { useRef } from "react";

function Payment() {

    const location = useLocation();
    if (!location.state) {

    return (

        <h1
            style={{
                textAlign:"center",
                marginTop:"100px"
            }}
        >
            No Payment Data
        </h1>

    );

}

    const navigate = useNavigate();
    const Ref = useRef();
    useEffect(() => {
        Ref.current.focus();
    },[])

   const {

    totalAmount,
    flight,
    departure,
    destination,
    date,
    selectedSeats,
    passengers,
    passengerDetails,
    isboard

} = location.state || {};
   

    const [paymentMethod,
        setPaymentMethod] = useState("UPI");

    const [loading,
        setLoading] = useState(false);


    function handlePayment() {

    setLoading(true);

    setTimeout(() => {

        const cu = JSON.parse(

            localStorage.getItem("currentUser")

        );

        const oldTickets = JSON.parse(

            localStorage.getItem("tickets")

        ) || [];

        passengerDetails.forEach(

            (passenger, index) => {

                const singleTicket = {

                    flight,
                    departure,
                    destination,
                    date,

                    current: cu.email,

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

        localStorage.setItem(

            "tickets",

            JSON.stringify(oldTickets)

        );

        navigate("/Mybookings");

    }, 3000);

}



    return (

        <div className="payment-page">

            <div className="payment-card">

                <h1 className="payment-title">

                    Complete Payment

                </h1>


                <h2 className="payment-amount">

                    ₹{totalAmount}

                </h2>


                <div className="payment-methods">

                    <div

                        className={

                            paymentMethod === "UPI"

                            ?

                            "payment-option active-payment"

                            :

                            "payment-option"

                        }

                        onClick={() =>
                            setPaymentMethod("UPI")
                        }

                    >

                        UPI

                    </div>


                    <div

                        className={

                            paymentMethod === "Card"

                            ?

                            "payment-option active-payment"

                            :

                            "payment-option"

                        }

                        onClick={() =>
                            setPaymentMethod("Card")
                        }

                    >

                        Card

                    </div>


                    <div

                        className={

                            paymentMethod === "NetBanking"

                            ?

                            "payment-option active-payment"

                            :

                            "payment-option"

                        }

                        onClick={() =>
                            setPaymentMethod("NetBanking")
                        }

                    >

                        Net Banking

                    </div>

                </div>


                {

                    paymentMethod === "UPI" && (

                        <input
                            type="text"
                            placeholder="Enter UPI ID"
                            className="payment-input"
                            ref={Ref}
                        />

                    )

                }


                {

                    paymentMethod === "Card" && (

                        <>

                            <input
                                type="text"
                                placeholder="Card Number"
                                className="payment-input"
                                ref={Ref}
                            />

                            <input
                                type="text"
                                placeholder="Card Holder Name"
                                className="payment-input"
                            />

                            <div className="card-row">

                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="payment-input"
                                />

                                <input
                                    type="password"
                                    placeholder="CVV"
                                    className="payment-input"
                                />

                            </div>

                        </>

                    )

                }


                {

                    paymentMethod === "NetBanking" && (

                        <select className="payment-input">

                            <option>
                                Select Bank
                            </option>

                            <option>
                                SBI
                            </option>

                            <option>
                                HDFC
                            </option>

                            <option>
                                ICICI
                            </option>

                            <option>
                                Axis Bank
                            </option>

                        </select>

                    )

                }


                <button
                    className="pay-now-btn"
                    onClick={handlePayment}
                >

                    {

                        loading

                        ?

                        (<img 
                            src={Loading2}
                            alt="Loading" className="loadings"/>
                        )

                        :

                        `Pay ₹${totalAmount}`

                    }

                </button>

            </div>

        </div>

    );

}

export default Payment;