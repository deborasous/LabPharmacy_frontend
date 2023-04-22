import React, { useContext, useState } from "react";
import { Card } from "./Card";
import { ProductContext } from "../contexts/ProductContext";
import { AiOutlineSearch } from "react-icons/ai";

export const CardContent = () => {
  const {
    handleOpenModal,
    searchTerm,
    filteredProducts,
    handleSearchInputChange,
    handleSearchInputBlur,
  } = useContext(ProductContext);

  return (
    <div>
      <div className="max-w-md mx-auto mb-10 border-2 border-neutral-300 rounded-md">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <AiOutlineSearch className="text-2xl" />
          </div>

          <input
            className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onBlur={handleSearchInputBlur}
          />
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="text-3xl text-neutral-600 mb-10">Produtos</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {filteredProducts.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                handleOpenModal={handleOpenModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
