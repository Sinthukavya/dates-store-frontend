import React, { useEffect, useState } from "react";
import api from "../api/axios";
//import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || user.email !== "admin@gmail.com") {
    window.location.href = "/";
  }
}, []);


  useEffect(() => {
    api.get("/orders/admin/all")
      .then(res => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const markDelivered = async (orderId) => {
    try {
      await api.put(`/orders/admin/${orderId}/deliver`);
      setOrders(prev =>
        prev.map(o =>
          o.id === orderId ? { ...o, status: "DELIVERED" } : o
        )
      );
    } catch (err) {
      alert("Failed to update order");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading orders…</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mt-5">Admin – All Orders</h2>

      {orders.map(order => (
        <div key={order.id} className="card mb-4 shadow-sm">

          {/* Header */}
          <div className="card-header d-flex justify-content-between">
            <div>
              <strong>Order #{order.id}</strong><br />
              <small>
                {order.customer?.name} ·{" "}
                {new Date(order.orderDate).toLocaleString()}
              </small>
            </div>

            <span className={`badge bg-${order.status === "DELIVERED" ? "success" : "warning"}`}>
              {order.status}
            </span>
          </div>

          {/* Address */}
          <div className="card-body border-bottom">
            <small className="text-muted">Delivery Address</small>
            <div>{order.address}</div>
          </div>

          {/* Items */}
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.product?.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
              <strong>Total: ₹{order.totalAmount}</strong>

              {order.status !== "DELIVERED" && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => markDelivered(order.id)}
                >
                  Mark Delivered
                </button>
              )}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
