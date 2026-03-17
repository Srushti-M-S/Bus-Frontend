import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

function SeatBooking() {
  const navigate = useNavigate();
const { id } = useParams();
const [bus, setBus] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [passengerName, setPassengerName] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ✅ Protect Route
  useEffect(() => {
  if (!token || user?.role !== "user") {
    alert("Only logged-in users can book seats");
    navigate("/");
    return;
  }

  fetchBus();
}, []);

const fetchBus = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/buses/${id}`);
    setBus(res.data);
  } catch (err) {
    console.log(err);
  }
};

  // ✅ Fetch booked seats safely
  const fetchBookedSeats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/${bus._id}`
      );
      setBookedSeats(res.data);
    } catch (err) {
      console.log("Error fetching booked seats", err);
    }
  };

  if (!bus) {
    return (
      <div className="p-6 text-center">
        <h2>No Bus Selected</h2>
        <button
          onClick={() => navigate("/buses")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const seatTypes = {
    Regular: bus.price,
    AC: bus.price + 100,
    Sleeper: bus.price + 200,
  };

  const seatNumbers = Array.from({ length: bus.totalSeats }, (_, i) => ({
    number: i + 1,
    type: i % 3 === 0 ? "AC" : i % 3 === 1 ? "Sleeper" : "Regular",
  }));

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat.number)) return;

    const exists = selectedSeats.find((s) => s.number === seat.number);

    if (exists) {
      setSelectedSeats(
        selectedSeats.filter((s) => s.number !== seat.number)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalPrice = selectedSeats.reduce(
    (acc, seat) => acc + seatTypes[seat.type],
    0
  );

  const handleBooking = async () => {
    if (!passengerName || selectedSeats.length === 0) {
      alert("Enter name and select seats");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          busId: bus._id,
          passengerName,
          seatNumbers: selectedSeats.map((s) => s.number),
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPaymentSuccess(true);
      generatePDF();
      fetchBookedSeats();
      setSelectedSeats([]);

    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Bus Ticket", 20, 20);
    doc.text(`Passenger: ${passengerName}`, 20, 30);
    doc.text(`Bus: ${bus.busName}`, 20, 40);
    doc.text(
      `Seats: ${selectedSeats.map((s) => s.number).join(", ")}`,
      20,
      50
    );
    doc.text(`Total: ₹${totalPrice}`, 20, 60);
    doc.save("ticket.pdf");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          Book Seats - {bus.busName}
        </h2>

        <input
          type="text"
          placeholder="Passenger Name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <div className="grid grid-cols-4 gap-2">
          {seatNumbers.map((seat) => {
            const isBooked = bookedSeats.includes(seat.number);
            const isSelected = selectedSeats.find(
              (s) => s.number === seat.number
            );

            return (
              <div
                key={seat.number}
                onClick={() => handleSeatClick(seat)}
                className={`p-3 text-center border rounded cursor-pointer
                  ${
                    isBooked
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : isSelected
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
              >
                {seat.number}
              </div>
            );
          })}
        </div>

        <p className="mt-4 font-bold">Total: ₹ {totalPrice}</p>

        {!paymentSuccess ? (
          <button
            onClick={handleBooking}
            className="w-full mt-4 bg-blue-600 text-white p-2 rounded"
          >
            Pay & Book
          </button>
        ) : (
          <div className="text-green-600 mt-4">
            Booking Successful ✅
          </div>
        )}
      </div>
    </div>
  );
}

export default SeatBooking;