import Qr from "../assets/qr.png";
import "./ticket.css"

function Ticket({ ticketData }) {

    const flightname =
        ticketData?.flight?.airline || "X Airlines";

    return (

        <div className="Ticket">

            {/* TOP LEFT */}

            <div className="ticketnav">

                <h1>
                    {flightname+"   "} Airlines
                </h1>

            </div>

            {/* TOP RIGHT */}

            <div className="tickednav">

                <h1>
                    Pass
                </h1>

            </div>

            {/* LEFT */}

            <div className="Ticketplane">

                <img
                    src={Qr}
                    alt=""
                    className="qr"
                />

                <h1 className="Tickettravel">

                    {ticketData.departure+"     "}

                    ➤  

                    {"     "+ticketData.destination}

                </h1>
                <div className="Ticketinfo">
                <p className="tp1">Departure Time  :  4:00 pm </p>
                <p className="tp2">Gate  :  8</p>
                <p className="tp3">Flight  :  85SKL</p>
                <p>Seat : {ticketData.selectedSeat}</p>
                </div>

            </div>

            {/* RIGHT */}

            <div className="Ticketdetails">

                <ul>

                    <li>

                        Name :

                        {" "}

                        {ticketData.passengerName}

                    </li>

                    <li>

                        Seat :

                        {" "}

                        {ticketData.selectedSeat}

                    </li>

                    <li>

                        Date :

                        {" "}

                        {ticketData.date}

                    </li>

                    <li>

                        Passenger :

                        {" "}

                        {ticketData.passengers}

                    </li>

                    <li>

                        Total :

                        {" "}

                        ₹{ticketData.totalAmount}

                    </li>

                </ul>

            </div>

        </div>

    );

}

export default Ticket;