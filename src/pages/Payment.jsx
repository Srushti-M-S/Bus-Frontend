import React, { useState } from "react";
import { jsPDF } from "jspdf";

const Payment = () => {
  const [name, setName] = useState("");
  const [busName, setBusName] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    if (!name || !busName || !seatNumber || !amount) {
      alert("Please fill all details!");
      return;
    }

    setPaymentSuccess(true);
    generateReceipt();
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bus Ticket Receipt 🚌", 20, 20);
    doc.setFontSize(12);
    doc.text(`Passenger Name: ${name}`, 20, 40);
    doc.text(`Bus Name: ${busName}`, 20, 50);
    doc.text(`Seat Number: ${seatNumber}`, 20, 60);
    doc.text(`Amount Paid: ₹${amount}`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 80);
    doc.save("bus_ticket_receipt.pdf");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Bus Payment & Ticket</h1>

      {!paymentSuccess ? (
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block mb-1">Passenger Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-1">Bus Name</label>
            <input
              type="text"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter bus name"
            />
          </div>

          <div>
            <label className="block mb-1">Seat Number</label>
            <input
              type="text"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter seat number"
            />
          </div>

          <div>
            <label className="block mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter amount"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Pay & Generate Ticket
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-green-600 font-bold text-xl mb-2">
            Payment Successful! ✅
          </h2>
          <p>Your ticket receipt has been downloaded.</p>
        </div>
      )}
    </div>
  );
};

export default Payment;