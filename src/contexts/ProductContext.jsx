import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  console.log(productList);

  //registrar produtos

  const resetForm = () => {
    setProduct({
      medicineName: "",
      labName: "",
      dosage: "",
      description: "",
      price: "",
      medicineType: "",
      productImage: "",
    });
  };

  const schema = yup.object().shape({
    medicineName: yup.string().required("Campo Obrigatório"),
    labName: yup.string().required("Campo Obrigatório"),
    dosage: yup.string().required("Campo Obrigatório"),
    description: yup.string(),
    price: yup.string().required("Campo Obrigatório"),
    medicineType: yup.string().required("Campo Obrigatório"),
    productImage: yup.string(),
  });

  const {
    register,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm(schema);

  const validateFields = (fields) => {
    for (const key in fields) {
      if (fields.hasOwnProperty(key) && !fields[key]) {
        return false;
      }
    }
    return true;
  };

  const addproduct = () => {
    const newproductData = [...productList, product];
    localStorage.setItem("Produtos", JSON.stringify(newproductData));
    setProductList(newproductData);
  };

  const submitproduct = async (e) => {
    e.preventDefault();
    const areFieldsValid = validateFields(
      product.medicineName &&
        product.labName &&
        product.dosage &&
        product.price &&
        product.medicineType
    );
    if (areFieldsValid) {
      try {
        await addproduct();
        resetForm();
        toast.success("Produto cadastrado com sucesso!");
      } catch (error) {
        toast.error(`Ocorreu um erro ao cadastrar o produto: ${error.message}`);
      }
    } else {
      toast.warning("Preencha todos os campos obrigatórios");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prevproduct) => ({
      ...prevproduct,
      [name]: value,
    }));
  };

  //server datajson

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
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
    register,
    setFocus,
    setValue,
    errors,
    validateFields,
    submitproduct,
    handleChange,
    addproduct,
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
