import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
import Support from "./components/support";

// SUPERB FEATURE: Auto-scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Mybookings" element={<Mybookings />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;