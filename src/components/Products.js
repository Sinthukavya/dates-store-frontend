import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar"; 
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


import img1 from "../assests/ajwa.jpg";
import img2 from "../assests/almonds.jpg";
import img3 from "../assests/pistachios.jpg";
import img4 from "../assests/mixedseeds.jpg";
import img5 from "../assests/organicseeds.jpg";
import img6 from "../assests/blackraisins.jpg";

export default function Shop() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const { addToCart } = useCart();
const navigate = useNavigate();

const [selectedWeights, setSelectedWeights] = React.useState({});
const handleWeightSelect = (id, weight) => {
  setSelectedWeights((prev) => ({
    ...prev,
    [id]: weight,
  }));
};

const handleAddToCart = (product) => {
  const weight = selectedWeights[product.id];
  if (!weight) {
    alert("Please select weight");
    return;
  }

  addToCart({
    ...product,
    weight,
    quantity: 1,
  });
};

const handleBuyNow = (product) => {
  const weight = selectedWeights[product.id];
  if (!weight) {
    alert("Please select weight");
    return;
  }

  addToCart({
    ...product,
    weight,
    quantity: 1,
  });

  navigate("/checkout");
};


  const products = [
  { id: 1, name: "Ajwa Dates", basePrice: 450, image: img1 },
  { id: 2, name: "Almonds", basePrice: 650, image: img2 },
  { id: 3, name: "Pistachios", basePrice: 750, image: img3 },
  { id: 4, name: "Mixed Nuts", basePrice: 550, image: img4 },
  { id: 5, name: "Organic Seeds", basePrice: 299, image: img5 },
  { id: 6, name: "Black Raisins", basePrice: 190, image: img6 },
];


  return (
    <div>
      <Navbar />

      <div className="container py-5" id="shop-page">
        <h1 className="text-center mt-5 fw-bold p-3">Our Products</h1>

        <div className="row g-4">
          {products.map((p, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index} data-aos="fade-up">
              <div className="card shadow-sm border-0 h-100">
                <img
                  src={p.image}
                  className="card-img-top img-fluid w-100"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column align-items-center text-center">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">{p.price}</p>

                  <select
                      className="form-select form-select-sm mb-3"
                      onChange={(e) => handleWeightSelect(p.id, e.target.value)}
                    >
                      <option value="">Select Weight</option>
                      <option value="250g">250g</option>
                      <option value="500g">500g</option>
                      <option value="1kg">1kg</option>
                    </select>


                  <div className="d-flex gap-2 w-100">
                    <button
                      className="btn btn-outline-dark btn-sm flex-fill"
                      onClick={() => handleAddToCart(p)}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-dark btn-sm flex-fill"
                      onClick={() => handleBuyNow(p)}
                    >
                      Buy Now
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
