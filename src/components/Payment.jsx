import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {

    const location = useLocation();

    const navigate = useNavigate();

    const {
        totalAmount,
        flight,
        departure,
        destination,
        date,
        selectedSeat,
        passengers,
        name
    } = location.state || {};

    const [paymentMethod,
        setPaymentMethod] = useState("UPI");

    const [loading,
        setLoading] = useState(false);


    function handlePayment() {

        setLoading(true);

        setTimeout(() => {

            navigate(
                "/boardingpass",
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
                        "Processing Payment..."
                        :
                        `Pay ₹${totalAmount}`

                    }

                </button>

            </div>

        </div>

    );

}

export default Payment;