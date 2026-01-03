import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));

if (res.data.email === "admin@gmail.com") {
  navigate("/admin/orders");   // route for AdminOrders.js
} else {
  const redirectTo = location.state?.from || "/";
  navigate(redirectTo);
}

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">

            <div className="card login-card border-0">
              <div className="card-body p-4 p-md-5">

                {/* Brand */}
                <div className="text-center mb-4">
                  <h2 className="brand-title">DryFruit Basket</h2>
                  <p className="brand-subtitle">
                    Freshness You Can Trust
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <label>Email Address</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <label>Password</label>
                  </div>

                  <button
                    className="btn login-btn w-100 py-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Login"}
                  </button>

                  <p className="text-center mt-4 mb-0 text-muted">
                    New to DryFruit Basket?{" "}
                    <Link to="/register" className="register-link">
                      Create an account
                    </Link>
                  </p>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
