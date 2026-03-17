import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBus() {
  const navigate = useNavigate();

  const [busData, setBusData] = useState({
    busName: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
  });

  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(
        "http://localhost:5000/api/buses",
        busData,   // ✅ FIXED
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // ✅ FIXED
          },
        }
      );

      alert("Bus added successfully ✅");
     // navigate("/Buses");
     navigate("/Buses", { state: { refresh: true } });

    } catch (err) {
      console.log(err.response?.data);
      alert("Error adding bus");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add New Bus
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input name="busName" value={busData.busName} onChange={handleChange} placeholder="Bus Name" className="p-3 border rounded-lg" required />
          <input name="from" value={busData.from} onChange={handleChange} placeholder="From" className="p-3 border rounded-lg" required />
          <input name="to" value={busData.to} onChange={handleChange} placeholder="To" className="p-3 border rounded-lg" required />
          <input name="departureTime" value={busData.departureTime} onChange={handleChange} placeholder="Departure Time" className="p-3 border rounded-lg" />
          <input name="arrivalTime" value={busData.arrivalTime} onChange={handleChange} placeholder="Arrival Time" className="p-3 border rounded-lg" />
          <input type="number" name="price" min="1" required value={busData.price} onChange={handleChange} placeholder="Enter price" className="p-3 border rounded-lg" />
          <input type="number" name="totalSeats" min="1" required value={busData.totalSeats} onChange={handleChange} placeholder="No. of Seats" className="p-3 border rounded-lg" />

          <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Add Bus
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBus;