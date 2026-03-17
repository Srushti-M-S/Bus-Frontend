import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import BusList from "./pages/BusList"; // For users to book
import Buses from "./pages/Buses";     // For admin to manage buses
import AddBus from "./pages/AddBus";
import EditBus from "./pages/EditBus";
import Navbar from "./components/Navbar";
import Payment from "./pages/payment";
import SeatBooking from "./pages/SeatBooking";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User view */}
        <Route path="/BusList" element={<BusList />} />
       <Route path="/book/:id" element={<SeatBooking />} />
        <Route path="/payment" element={<Payment />} />

        {/* Admin view */}
        <Route path="/Buses" element={<Buses />} />
        <Route path="/AddBus" element={<AddBus />} />
        <Route path="/EditBus/:id" element={<EditBus />} />
        
      </Routes>
    </>
  );
}

export default App;