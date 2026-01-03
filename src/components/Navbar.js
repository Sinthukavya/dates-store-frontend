import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Navbar.css";
import { ShoppingCart, UserCircle } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const navigate = useNavigate();

  // 🔑 Ref for avatar + dropdown
  const avatarRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setAvatarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="custom-navbar">
      <div className="nav-brand">✺ DryFruit Basket</div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>

        {!isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li className="avatar-container" ref={avatarRef}>
            <UserCircle
              size={28}
              style={{ cursor: "pointer" }}
              onClick={() => setAvatarOpen(prev => !prev)}
            />

            {avatarOpen && (
              <div className="avatar-dropdown">
                <button
                  onClick={() => {
                    setAvatarOpen(false);
                    navigate("/orders");
                  }}
                >
                  Orders
                </button>

                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </li>
        )}

        <li>
          <Link to="/checkout">
            <ShoppingCart size={20} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
