import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import CreateAccount from "./components/createAccount";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/about";

import Footer from "./components/footer";

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
      </Routes>

      <div className="container">

        <Routes>
          

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/createAccount"
            element={<CreateAccount />}
          />

        </Routes>
        

      </div>
      <Footer />

    </BrowserRouter>
  );
}

export default App;