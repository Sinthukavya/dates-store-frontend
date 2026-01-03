import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-bg d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">

            <div className="card register-card border-0">
              <div className="card-body p-4 p-md-5">

                {/* Brand */}
                <div className="text-center mb-4">
                  <h2 className="brand-title">DryFruit Basket</h2>
                  <p className="brand-subtitle">
                    Premium • Fresh • Natural
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <label>Full Name</label>
                  </div>

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

                  <div className="form-floating mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                    <label>Phone Number</label>
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
                    className="btn register-btn w-100 py-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>

                  <p className="text-center mt-4 mb-0 text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">
                      Login
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
