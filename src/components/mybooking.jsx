import Ticket from "./ticket";

function MyBookings() {

    const tickets = JSON.parse(

        localStorage.getItem("tickets")

    ) || [];

    return (

        <div className="bookings">

            {

                tickets.length > 0

                ?

                tickets.map((ticket, index) => (

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