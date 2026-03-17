import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Buses() {
  const [buses, setBuses] = useState([]);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // store user during login
const location = useLocation();

  /*useEffect(() => {
    fetchBuses();
  }, []);*/
  useEffect(() => {
  fetchBuses();
}, [location]);

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/buses");
      setBuses(res.data);
    } catch (err) {
      console.error("Error fetching buses:", err);
    }
  };

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this bus?"
  );

  if (!confirmDelete) return;

  try {
    const user = JSON.parse(localStorage.getItem("user"));

await axios.delete(
  `http://localhost:5000/api/buses/${id}`,
  {
    headers: {
      Authorization: `Bearer ${user?.token}`, // ✅ FIXED
    },
  }
);

    alert("Bus Deleted Successfully 🗑️");

    fetchBuses(); // refresh list

  } catch (error) {
    alert("Failed to delete bus");
  }
};

  /*const filteredBuses = buses.filter(
    (bus) =>
      bus.from.toLowerCase().includes(searchFrom.toLowerCase()) &&
      bus.to.toLowerCase().includes(searchTo.toLowerCase())
  );*/
  const filteredBuses = buses.filter((bus) => {
  const from = bus.from?.toLowerCase() || "";
  const to = bus.to?.toLowerCase() || "";

  return (
    from.includes(searchFrom.toLowerCase()) &&
    to.includes(searchTo.toLowerCase())
  );
});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Available Buses
      </h2>

      {/* Search Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="From"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="To"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            className="p-3 border rounded-lg"
          />
        </div>
      </div>

      {/* Bus Cards */}
      {filteredBuses.length === 0 ? (
        <p className="text-center text-gray-500">No buses found 🚫</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredBuses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {bus.busName}
              </h3>

              <p><strong>From:</strong> {bus.from}</p>
              <p><strong>To:</strong> {bus.to}</p>
              <p><strong>Departure:</strong> {bus.departureTime}</p>
              <p><strong>Arrival:</strong> {bus.arrivalTime}</p>
              <p><strong>Total Seats:</strong> {bus.totalSeats}</p>

              <p className="font-semibold text-green-600 mt-2">
                ₹ {bus.price}
              </p>

              {/* Book Button */}
              <button
                onClick={() => navigate(`/book/${bus._id}`)}
                className="mt-3 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Book Now
              </button>

              {/* Admin Buttons */}
              {user?.role === "admin" && (
                <>
                  <button
                    onClick={() => navigate(`/EditBus/${bus._id}`)}
                    className="mt-2 w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(bus._id)}
                    className="mt-2 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Buses;