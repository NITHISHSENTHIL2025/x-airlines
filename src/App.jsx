import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import CreateAccount from "./components/createAccount";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/about";
import Flights from "./components/flights";
import Footer from "./components/footer";
import SeatSelection from "./components/SeatSelection";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";

import Mybookings from "./components/mybooking";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/createAccount"
          element={<CreateAccount />}
        />

        <Route
          path="/flights"
          element={<Flights />}
        />

        <Route
          path="/seats"
          element={<SeatSelection />}
        />
        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route
          path="/payment"
          element={<Payment />}
        />
        <Route
        path="/mybookings"
        element={<Mybookings/>}/>
        

      </Routes>

      <Footer />

    </BrowserRouter>

  );
}
export default App;