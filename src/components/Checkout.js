import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const [address, setAddress] = useState("");

  const { cartItems, setCartItems, removeFromCart } = useCart();
   const navigate = useNavigate();

  const weightMultiplier = {
    "250g": 1,
    "500g": 2,
    "1kg": 4,
  };

  const handleQuantityChange = (id, value) => {
  setCartItems(
    cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, Number(value)) }
        : item
    )
  );
};


  const handleWeightChange = (id, weight) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, weight } : item
      )
    );
  };

  const getItemTotal = (item) =>
    item.basePrice * weightMultiplier[item.weight] * item.quantity;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getItemTotal(item),
    0
  );

  const shipping = 50;
  const total = subtotal + shipping;

  const handlePayNow = async () => {
  // 🔐 CHECK LOGIN
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    // not logged in → go to login page
    navigate("/login", { state: { from: "/checkout" } });
    return;
  }

  try {
    const customerId = user.id; // ✅ real user id

    const orderPayload = {
  customerId,
  address,
  items: cartItems.map(item => ({
    productId: item.id,
    quantity: item.quantity,
    weight: item.weight   // ✅ ADD THIS
  }))
};


    const response = await axios.post(
      "http://localhost:8080/api/orders",
      orderPayload
    );

    alert("Order placed successfully ✅");

    setCartItems([]);
    navigate("/");

  } catch (error) {
    console.error("Order failed", error);
    alert("Order failed ❌");
  }
};




  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>Your cart is empty 🛒</h4>
      </div>
    );
  }

  return (
    <div className="py-5" style={{ background: "linear-gradient(135deg, #fdf6ec, #f7efe5)" }}>
      <div className="container">

        <div className="text-center mt-5">
          <h2 className="fw-bold text-brown">Checkout 🛒</h2>
          <p className="text-muted">Review your selected products</p>
        </div>

        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.weight}`} className="row align-items-center border-bottom py-3">

                    <div className="col-3 col-md-2">
                      <img src={item.image} alt={item.name} className="img-fluid rounded-3" />
                    </div>

                    <div className="col-9 col-md-4">
                      <h6>{item.name}</h6>
                      <small>Weight: {item.weight}</small>
                    </div>

                    <div className="col-md-2">
                      <select
                        className="form-select"
                        value={item.weight}
                        onChange={(e) => handleWeightChange(item.id, e.target.value)}
                      >
                        <option value="250g">250g</option>
                        <option value="500g">500g</option>
                        <option value="1kg">1kg</option>
                      </select>
                    </div>

                    <div className="col-md-2">
                      <input type="number" min="1" className="form-control" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} />
                    </div>

                    <div className="col-md-2 text-end">
                      <strong>₹ {getItemTotal(item)}</strong>
                      <button
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => removeFromCart(item.id, item.weight)}
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary + Pay Now */}
          <div className="col-lg-4">
            <div className="card shadow-lg rounded-4">
              <div className="card-body">
                <h5>Delivery Address</h5>

                <textarea
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Enter full delivery address (House no, Street, City, Pincode)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <h5>Price Summary</h5>
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping: ₹{shipping}</p>
                <h5>Total: ₹{total}</h5>
                <button
                  className="btn btn-dark w-100 mt-3"
                  onClick={handlePayNow}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
