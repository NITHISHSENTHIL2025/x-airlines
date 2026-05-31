import Ticket from "./ticket";
import "./mybookings.css"
function MyBookings() {

    const tickets = JSON.parse(

        localStorage.getItem("tickets")
    

    ) || [];
    const cu = JSON.parse(
    localStorage.getItem("currentUser")
) || {};
    const myTickets = tickets.filter(
    ticket =>
    ticket.current === cu.email
);
    return (

        <div className="bookings">

            {

                myTickets.length > 0

                ?

                myTickets.map((ticket, index) => (

                    <Ticket
                        key={index}
                        ticketData={ticket}
                    />

                ))

                :

                <h1
                    style={{
                        textAlign: "center",
                        marginTop: "100px"
                    }}
                >

                    No Bookings Found

                </h1>

            }

        </div>

    );

}

export default MyBookings;