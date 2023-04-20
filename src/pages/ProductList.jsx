import React from "react";
import { ProductModal } from "../components/ProductModal";
import { CardContent } from "../components/CardContent";

export const ProductList = () => {
  return (
    <section className="antialiased bg-gray-100 text-gray-900 font-sans">
      <hr />
      <CardContent />
      <ProductModal />
    </section>
  );
};
