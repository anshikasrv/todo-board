import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Optionally fetch user name from localStorage or decode token
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); // if used
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        📝 KanbanBoard
      </Link>
      <div className="nav-links">
        {userName && <span className="welcome">Welcome, {userName}</span>}
        <Link to="/login">Login</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
