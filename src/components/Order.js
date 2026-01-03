import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Order.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      setLoading(false);
      return;
    }

    api.get(`/orders/customer/${user.id}`)
      .then(res => {
        setOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="orders-loading text-center">
        <div className="spinner-border" />
        <p className="mt-3">Fetching your fresh orders…</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 py-5">
      {/* Header */}
      <div className="orders-header mb-4">
        <h2>My Orders</h2>
        <span>{orders.length} orders</span>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="empty-orders card border-0">
          <h5>No orders yet 🌰</h5>
          <p>
            Looks like you haven’t placed any orders.
            Start shopping premium dry fruits today!
          </p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card card border-0 mb-4">

            {/* Order Header */}
            <div className="order-card-header">
              <div>
                <div className="order-id">Order #{order.id}</div>
                <small>
                  {new Date(order.orderDate).toLocaleDateString()} ·{" "}
                  {new Date(order.orderDate).toLocaleTimeString()}
                </small>
              </div>

              <span className={`status-badge ${order.status?.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            {/* ✅ ADDRESS HERE */}
  {order.address && (
    <div className="order-address px-4 py-3 border-bottom">
      <small className="text-muted">Delivery Address</small>
      <div className="fw-medium">{order.address}</div>
    </div>
  )}

            {/* Order Body */}
            <div className="card-body">
              <div className="order-total">
                <span>Total Amount</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>

              <div className="table-responsive mt-3">
                <table className="table order-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map(item => (
                      <tr key={item.id}>
                        <td className="fw-medium">
                          {item.product?.name}
                        </td>
                        <td className="text-center">
                          {item.quantity}
                        </td>
                        <td className="text-end">
                          ₹{item.price.toFixed(2)}
                        </td>
                        <td className="text-end fw-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
}
