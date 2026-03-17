import { useEffect, useState } from "react";
import axios from "axios";

const BusList = () => {
  const [buses, setBuses] = useState([]);

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/buses");
      setBuses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div>
      {buses.map((bus) => (
        <div key={bus._id}>
          <h3>{bus.busName}</h3>
          <p>{bus.from} → {bus.to}</p>
          <p>Price: ₹{bus.price}</p>
        </div>
      ))}
    </div>
  );
};

export default BusList;