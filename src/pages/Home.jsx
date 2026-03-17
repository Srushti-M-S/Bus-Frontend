/*import { useEffect, useState } from "react";

function Home() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/bus/all")
      .then(res => res.json())
      .then(data => setBuses(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Available Buses</h1>

      {buses.map((bus) => (
        <div key={bus._id} style={{
          background: "#f8fafc",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h3>{bus.busName}</h3>
          <p>{bus.from} → {bus.to}</p>
          <p>Departure: {bus.departureTime}</p>
          <p>₹{bus.price}</p>
          <button style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Bus Booking System
      </h2>
      <p className="text-lg text-gray-600">
        Book and Manage Bus Services Easily 🚀
      </p>
    </div>
  );
}

export default Home;*/
import { useState } from "react";

function AddBus() {
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
    setBusData({
      ...busData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bus Data Submitted:", busData);

    alert("Bus Added Successfully 🚍");

    // Later we will connect backend API here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add New Bus
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="busName"
            placeholder="Bus Name"
            value={busData.busName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="from"
              placeholder="From"
              value={busData.from}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <input
              type="text"
              name="to"
              placeholder="To"
              value={busData.to}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              name="departureTime"
              value={busData.departureTime}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <input
              type="time"
              name="arrivalTime"
              value={busData.arrivalTime}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Ticket Price"
              value={busData.price}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <input
              type="number"
              name="totalSeats"
              placeholder="Total Seats"
              value={busData.totalSeats}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add Bus
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddBus;