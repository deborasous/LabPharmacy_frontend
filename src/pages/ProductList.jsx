import React from "react";
import { ProductModal } from "../components/ProductModal";
import { CardContent } from "../components/CardContent";

export const ProductList = () => {
  return (
    <section className="container m-auto my-12 ">
      <CardContent />
      <ProductModal />
    </section>
  );
};
