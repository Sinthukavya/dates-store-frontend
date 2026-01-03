import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import "../components/BestProducts.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


// Temporary images
import img1 from "../assests/ajwa.jpg";
import img2 from "../assests/almonds.jpg";
import img3 from "../assests/pistachios.jpg";
import img4 from "../assests/mixedseeds.jpg";
import img5 from "../assests/organicseeds.jpg";
import img6 from "../assests/blackraisins.jpg";

export default function BestProducts() {
  const { addToCart } = useCart();
const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState({});

  const images = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    AOS.init({ duration: 800 });

    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleWeightChange = (productId, weight) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [productId]: weight,
    }));
  };

const handleAddToCart = (product, index, isBuyNow = false) => {
  const weight = selectedWeights[product.id];

  if (!weight) {
    alert("Please select weight");
    return;
  }

  addToCart({
    id: product.id,
    name: product.name,
    basePrice: product.price,
    weight,
    image: images[index % images.length],
  });

  if (isBuyNow) {
    navigate("/checkout");
  }
};



  return (
    <div className="container py-5" id="best-products">
      <h1 className="text-center mb-4 fw-bold">Best Sellers</h1>

      <div className="row g-4">
        {products.map((product, index) => (
          <div
            className="col-6 col-md-4 col-lg-3"
            key={product.id}
            data-aos="fade-up"
          >
            <div className="card shadow-sm border-0 h-100">
              <img
                src={images[index % images.length]}
                alt={product.name}
                className="card-img-top img-fluid object-fit-cover"
                style={{ height: "180px" }}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>

                <p className="card-text text-muted fw-semibold">
                  ₹{product.price}
                </p>

                {/* ✅ Weight Selection */}
                <select
                  className="form-select form-select-sm mb-3"
                  value={selectedWeights[product.id] || ""}
                  onChange={(e) =>
                    handleWeightChange(product.id, e.target.value)
                  }
                >
                  <option value="">Select Weight</option>
                  <option value="250g">250g</option>
                  <option value="500g">500g</option>
                  <option value="1kg">1kg</option>
                </select>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm w-50"
                    onClick={() => handleAddToCart(product, index)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn btn-dark btn-sm w-50"
                    onClick={() => handleAddToCart(product, index, true)}
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
  );
}
