import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [busData, setBusData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBus();
  }, []);

  const fetchBus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/buses/${id}`
      );
      setBusData(response.data);
    } catch (error) {
      alert("Error fetching bus details");
    }
  };

  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  try {
    if (
      !busData.busName ||
      !busData.from ||
      !busData.to ||
      busData.price <= 0 ||
      busData.totalSeats <= 0
    ) {
      alert("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user")); // ✅ FIXED

    await axios.put(
      `http://localhost:5000/api/buses/${id}`,
      busData,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`, // ✅ FIXED
        },
      }
    );

    alert("Bus Updated Successfully ✏️");
    //navigate("/Buses");
    navigate("/Buses", { state: { refresh: true } });

  } catch (error) {
    alert(error.response?.data?.message || "Update failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Edit Bus
        </h2>

        <input
          name="busName"
          value={busData.busName || ""}
          onChange={handleChange}
          placeholder="Enter Bus Name"
          className="w-full p-2 border rounded mb-2"
        />

        <input
          name="from"
          value={busData.from || ""}
          onChange={handleChange}
          placeholder="From"
          className="w-full p-2 border rounded mb-2"
        />

        <input
          name="to"
          value={busData.to || ""}
          onChange={handleChange}
          placeholder="Enter Destination"
          className="w-full p-2 border rounded mb-2"
        />
        <input
  name="departureTime"
  value={busData.departureTime || ""}
  onChange={handleChange}
  placeholder="Departure Time"
  className="w-full p-2 border rounded mb-2"
/>

<input
  name="arrivalTime"
  value={busData.arrivalTime || ""}
  onChange={handleChange}
  placeholder="Arrival Time"
  className="w-full p-2 border rounded mb-2"
/>
        <input
  type="number"
  name="price"
  min="1"
  required
  value={busData.price || ""}
  onChange={handleChange}
  placeholder=" Enter price"
  className="w-full p-2 border rounded mb-2"
/>

        <input
  type="number"
  name="totalSeats"
  min="1"
  required
  value={busData.totalSeats || ""}
  onChange={handleChange}
  placeholder=" No. of Seats"
  className="w-full p-2 border rounded mb-2"
/>

       <button
  onClick={handleUpdate}
  disabled={loading}
  className={`w-full p-2 rounded text-white ${
    loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? "Updating..." : "Update Bus"}
</button>
      </div>
    </div>
  );
}

export default EditBus;