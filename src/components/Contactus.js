import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/axios";

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contact", {
        fullName,
        email,
        phone,
        message,
      });

      alert("Message sent successfully!");

      // Clear form
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #fdf6ec, #f7efe5)",
      }}
    >
      <div className="container">
        <div className="text-center mt-5">
          <h2 className="fw-bold text-brown">Get in Touch 🌰</h2>
          <p className="text-muted">
            Have questions about our premium dry fruits? We’re happy to help.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg rounded-4 p-4 h-100">
              <h5 className="mb-4 fw-semibold text-brown">
                Send Us a Message
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control rounded-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100 py-2 fw-semibold rounded-3"
                  style={{
                    backgroundColor: "#8b5e3c",
                    color: "#fff",
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4 h-100 text-white"
              style={{
                background: "linear-gradient(135deg, #8b5e3c, #a47148)",
              }}
            >
              <h5 className="mb-4 fw-semibold">Contact Information</h5>

              <p>
                <strong>📍 Address</strong><br />
                123 Market Road,<br />
                Nagercoil, Tamil Nadu, India
              </p>

              <p>
                <strong>📧 Email</strong><br />
                support@dryfruitshop.com
              </p>

              <p>
                <strong>📞 Phone</strong><br />
                +91 98765 43210
              </p>

              <p className="opacity-75 mt-auto">
                🕒 Monday – Saturday<br />
                9:00 AM – 8:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .text-brown { color: #8b5e3c; }
          .form-control:focus {
            border-color: #8b5e3c;
            box-shadow: 0 0 0 0.2rem rgba(139, 94, 60, 0.25);
          }
        `}
      </style>
    </div>
  );
}
