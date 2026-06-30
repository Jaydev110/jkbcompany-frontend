import { Routes, Route } from "react-router-dom";

import Header from "./component/Header";
import NavBar from "./NavBar";
import Footer from "./component/Footer";

import Home from "./component/menubar/Home";
import AboutUs from "./component/menubar/AboutUs";
import Services from "./component/menubar/Services";
import Contact from "./component/menubar/ContactUs";

import Login from "./component/menubar/login";
import Register from "./component/menubar/Register";
import ResetPassword from "./component/menubar/ResetPassword";
import Dashboard from "./component/menubar/Dashboard";

function App() {
  return (
    <>
      <Header />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;