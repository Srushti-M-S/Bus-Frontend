import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold tracking-wide">
          BusBooking 🚍
        </h1>

        <div className="space-x-6 flex items-center">

          <Link
            to="/"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/Buses"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            View Buses
          </Link>

          {/* Show Add Bus only for Admin */}
          {user?.role === "admin" && (
            <Link
              to="/AddBus"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-black transition duration-300"
            >
              Add Bus
            </Link>
          )}

        <div className="space-x-6 flex items-center">

  {user && (
    <span className="text-white font-medium">
      👋 Welcome, {user.name}
      {user.role === "admin" && (
        <span className="ml-2 bg-yellow-300 text-black px-2 py-1 rounded text-xs">
          ADMIN
        </span>
      )}
    </span>
  )}

  {user && (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  )}
</div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;