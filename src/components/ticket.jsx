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