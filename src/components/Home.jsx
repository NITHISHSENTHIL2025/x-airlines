import { Link } from "react-router-dom";
import air from "../assets/airs.png";
import { useEffect, useState } from "react";

function Home() {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    const title = currentUser
        ? `Welcome, ${currentUser.firstName}!`
        : "X Airlines";

    

    return (
        <>

            <main className="home-main">

                <div
                    className="home-main-content"

                    
                >

                    <div className="home-search-nav-container">

                        <h2 className="home-subtitle">
                            {title}
                        </h2>

                    </div>

                    <div className="home-main-content-search">

                        <div className="home-search-container">

                            <input
                                type="text"
                                placeholder="Departure"
                                className="home-search1"
                            />

                            <input
                                type="text"
                                placeholder="Destination"
                                className="home-search2"
                            />

                            <input
                                type="date"
                                className="home-search3"
                            />

                            <input
                                type="number"
                                placeholder="Passengers"
                                className="home-search4"
                            />

                        </div>

                        <p className="home-search-text">

                            Your Journey Starts With X Airlines.
                            Book domestic and international flights
                            at the best prices

                        </p>

                        <button className="home-search-button">

                            🔍

                        </button>
                        <img
                        src={air}
                        alt="Airplane"
                        className="home-main2-image"

                        
                    />

                    </div>

                    

               

                </div>

                
                <div className="home-main3">
                    <div className="home-main3-head">

                    <h2 className="home-main3-title">
                        WHY CHOOSE X AIRLINES
                    </h2>
                    </div>
                    <div className="home3mainbox">
                        
                    <div className="home-main3-content1">
                        <ul className="home-main3-list">
                            <li className="home-main3-item">
                                ✓ Lowest Prices</li>        <li>✓ Secure Payments</li>
<li>✓ Fast Booking</li>
                            
                        </ul>
                    </div> 
                    <div className="home-main3-content1">
                        <ul className="home-main3-list">
                            <li className="home-main3-item">
                                ✓ 24/7 Customer Support</li>        <li>✓ Flexible Booking</li>
<li>✓ Exclusive Deals</li>
                        </ul>
                    </div>
                    </div>
                </div>

            </main>

        </>
    );
}

export default Home;