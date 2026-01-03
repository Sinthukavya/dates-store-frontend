import React from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import BestProducts from "./components/BestProducts";
import Assurance from "./components/Assurance";
import Footer from "./components/Footer";



export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <BestProducts />
      <Assurance />
      <Footer />
    </div>
  );
}
