import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  console.log(productList);

  //requisição db

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then(setProductList)
      .catch(console.dir);
  }, []);

  //modal

  const handleOpenModal = (item) => {
    setSelectedProduct(item);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  //search

  const filteredProducts = productList.filter((product) => {
    return (
      product.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm)
    );
  });

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchInputBlur = () => {
    setSearchTerm("");
  };

  const contextValues = {
    productList,
    setProductList,
    modal,
    setModal,
    selectedProduct,
    setSelectedProduct,
    handleOpenModal,
    handleCloseModal,
    product,
    setProduct,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    handleSearchInputChange,
    handleSearchInputBlur,
  };

  return (
    <ProductContext.Provider value={contextValues}>
      {children}
    </ProductContext.Provider>
  );
};
