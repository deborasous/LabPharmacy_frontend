import React from "react";
import { Button } from "react-bootstrap";
import Imagem1 from "../assets/image-products/imagem1.png";
import Imagem2 from "../assets/image-products/imagem2.png";

export const Card = ({ product, handleOpenModal }) => {
  return (
    <div className="min-w-280 max-w-320  m-auto rounded-md overflow-hidden bg-white border-neutral-300 border-2 p-5 hover:shadow-xl hover:border-neutral-300 hover:scale-105  lg:w-full">
      <div className="w-full  m-auto">
        {product.medicineType === "Comum" ? (
          <img src={Imagem1} alt="Imagem 1" className="h-180 m-auto" />
        ) : (
          <img src={Imagem2} alt="Imagem 2" className="h-180 m-auto " />
        )}
      </div>
      <div className=" text-center">
        <h3 className="font-bold text-xl mb-2 text-neutral-700">
          {product.medicineName}
        </h3>
        <h2 className="text-gray-700 text-2xl">R$ {product.price}</h2>
      </div>
      <div className="flex justify-around">
        <Button
          className=" bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-base  rounded-lg px-14 py-2 mt-5"
          onClick={() => handleOpenModal(product)}
        >
          Mais
        </Button>
      </div>
    </div>
  );
};
