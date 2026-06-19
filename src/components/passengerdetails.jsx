import "./passengerdetails.css";

function PassengerDetails({ passenger, index, handlePassengerChange }) {
    return (
        <div className="passenger-card">
            <h2>Passenger {index + 1}</h2>

            <input
                type="text"
                placeholder="Full Name"
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
            />

            <input
                type="number"
                min="1"
                max="120"
                placeholder="Age"
                value={passenger.age}
                onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
            />

            <select
                value={passenger.gender}
                onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
}

export default PassengerDetails;