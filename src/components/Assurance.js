import React from "react";
import { Truck, ShieldCheck, BadgeCheck, CreditCard } from "lucide-react";

export default function TrustSection() {
  const features = [
    {
      icon: <Truck size={40} />,
      title: "All Over India Shipping",
      description:
        "We deliver our products safely and quickly to every corner of India, ensuring reliable nationwide coverage.",
    },
    {
      icon: <BadgeCheck size={40} />,
      title: "Premium Quality Products",
      description:
        "Every product is carefully selected and quality-checked to meet high standards you can trust.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Secure & Safe Payments",
      description:
        "Your payments are protected with industry-grade encryption and trusted payment gateways.",
    },
    {
      icon: <CreditCard size={40} />,
      title: "Multiple Payment Options",
      description:
        "Pay with UPI, cards, net banking, or wallets — fast, easy, and hassle-free.",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Shop With Us?</h2>
          <p className="text-muted">
            We are committed to delivering quality, trust, and convenience with every order.
          </p>
        </div>

        <div className="row g-4">
          {features.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 text-center shadow-sm border-0">
                <div className="card-body">
                  <div className="mb-3 text-primary">{item.icon}</div>
                  <h5 className="card-title fw-semibold">{item.title}</h5>
                  <p className="card-text text-muted small">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
