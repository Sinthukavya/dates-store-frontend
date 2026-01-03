import { Routes, Route } from "react-router-dom";
import Home from "./Home";

import Navbar from "./components/Navbar";
import Product from "./components/Products";
import ContactUs from "./components/Contactus";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import Orders from "./components/Order";
import AdminOrders from "./components/AdminOrders";

import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Product />} />
        <Route path="/login" element={<Login />} />       
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </CartProvider>
  );
}
