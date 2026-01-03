// Footer.js
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 col-sm-6 mb-4">
            <h5>About DryFruit Shop</h5>
            <p>
              We provide high-quality dry fruits sourced from trusted suppliers across India.
              Freshness, taste, and quality are our top priorities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-white text-decoration-none">Products</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Contact Us</h5>
            <p>Email: support@dryfruitshop.com</p>
            <p>Phone: +91 1234567890</p>
            <p>Address: 123, DryFruit Street, Nagercoil, India</p>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaTwitter />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <hr className="bg-white" />

        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} DryFruit Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
