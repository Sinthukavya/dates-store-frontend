import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import img1 from "../assests/dates.jpg";
import img2 from "../assests/nuts.jpg";
import img3 from "../assests/seeds.jpg";

export default function HeroSlider() {
  const slides = [
    { image: img1, title: "Fresh Dates", offer: "FLAT 10% OFF", coupon: "DATE10" },
    { image: img2, title: "Premium Nuts", offer: "BUY 1 GET 1 FREE", coupon: "NUTS50" },
    { image: img3, title: "Organic Seeds", offer: "20% OFF", coupon: "SEED20" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800 });

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="position-relative w-100 vh-100 overflow-hidden">

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${slides[index].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "0.8s ease-in-out",
        }}
      />

      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <div
        className="position-relative text-center text-white d-flex flex-column justify-content-center align-items-center h-100"
        data-aos="fade-up"
        key={index}
      >
        <h1 className="display-1 fw-bold text-shadow">{slides[index].title}</h1>
        <p className="fs-2">{slides[index].offer}</p>
        <p className="fs-5">
          USE COUPON : <span className="text-warning fw-bold">{slides[index].coupon}</span>
        </p>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="arrow-btn left">❮</button>
      <button onClick={next} className="arrow-btn right">❯</button>
    </div>
  );
}
