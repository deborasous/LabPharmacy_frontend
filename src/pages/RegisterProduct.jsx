import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const RegisterProduct = () => {
  const [productData, setProductData] = useState([]);
  let [product, setProduct] = useState({
    medicineName: "",
    labName: "",
    dosage: "",
    description: "",
    price: "",
    medicineType: "",
    productImage: "",
  });

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
    const newproductData = [...productData, product];
    localStorage.setItem("Produtos", JSON.stringify(newproductData));
    setProductData(newproductData);
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

  return (
    <section className="py-10">
      <h1 className="text-4xl text-center text-neutral-600 mb-6">
        Cadastrar Medicamentos
      </h1>

      <Form
        onSubmit={submitproduct}
        className="block max-w-6xl m-auto px-6 py-10 lg:px-10 border-2 border-gray-100 rounded-lg shadow-md shadow-slate-300 bg-gray-100"
      >
        <ToastContainer />

        <div>
          <div className="pb-6">
            <h3 className="pb-1 text-green-800 text-xl">
              *Dados do medicamento
            </h3>
            <hr className="pb-6 border-neutral-400" />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Form.Group
                className="grid mb-5 text-neutral-500"
                controlId="formBasicEmail"
              >
                <Form.Label className="mb-1">*Nome</Form.Label>
                <Form.Control
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
                  type="text"
                  placeholder="Nome do medicamento"
                  name="medicineName"
                  value={product.medicineName}
                  {...register("medicineName", { required: true })}
                  onChange={handleChange}
                />
                {errors.medicineName && (
                  <p className="text-red-500">{errors.medicineName?.message}</p>
                )}
              </Form.Group>

              <Form.Group
                className="grid mb-5 text-neutral-500"
                controlId="formBasicPassword"
              >
                <Form.Label className="mb-1">*Nome do laboratório</Form.Label>
                <Form.Control
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                  type="text"
                  name="labName"
                  placeholder="Nome do laboratório"
                  value={product.labName}
                  {...register("labName", { required: true })}
                  onChange={handleChange}
                />
                {errors.labName && (
                  <p className="text-red-500">{errors.labName?.message}</p>
                )}
              </Form.Group>

              <Form.Group
                controlId="cnpj"
                className="grid mb-5 text-neutral-500"
              >
                <Form.Label className="mb-1">*Dosagem</Form.Label>
                <InputMask
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50"
                  type="text"
                  name="dosage"
                  value={product.dosage}
                  {...register("dosage", { required: true })}
                  onChange={handleChange}
                />
                {errors.dosage && (
                  <p className="text-red-500">{errors.dosage?.message}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-1">
            <Form.Group
              className="grid mb-5 text-neutral-500"
              controlId="formBasicEmail"
            >
              <Form.Label className="mb-1">Descrição do medicamento</Form.Label>
              <FloatingLabel controlId="floatingTextarea">
                <Form.Control
                  as="textarea"
                  name="description"
                  type="email"
                  className="w-full h-full rounded border-2 border-gray-400 p-3 outline-none"
                  placeholder="Descrição do medicamento"
                  value={product.description}
                  {...register("description")}
                  onChange={handleChange}
                />
              </FloatingLabel>
              {errors.description && (
                <p className="text-red-500">{errors.description?.message}</p>
              )}
            </Form.Group>
          </div>

          <div>
            <h3 className="pb-1 text-green-800 text-xl">Dados de venda</h3>
            <hr className="pb-6  border-neutral-400" />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Form.Group
                className="grid mb-4 text-neutral-500"
                controlId="formBasicPassword"
              >
                <Form.Label className="mb-1">*Preço do medicamento</Form.Label>
                <InputMask
                  className="w-full rounded border-2 border-gray-400 p-3 outline-none max-h-50 "
                  type="text"
                  placeholder="R$"
                  mask={"R$ 999,99"}
                  name="price"
                  value={product.price}
                  {...register("price", { required: true })}
                  onChange={handleChange}
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price?.message}</p>
                )}
              </Form.Group>

              <Form.Group
                className="grid mb-4 text-neutral-500"
                controlId="formBasicOptions"
              >
                <Form.Label className="mb-1">*Selecione o tipo</Form.Label>
                <Form.Select
                  aria-label="Seleção padrão"
                  className="w-full rounded border-2 bg-white border-gray-400 p-3 outline-none max-h-50 "
                  type="text"
                  name="medicineType"
                  value={product.medicineType}
                  {...register("medicineType", { required: true })}
                  onChange={handleChange}
                >
                  <option className="text-neutral-500">Selecione</option>
                  <option value="controlled">controlado</option>
                  <option value="noControlled">Comum</option>
                </Form.Select>
                {errors.medicineType && (
                  <p className="text-red-500">{errors.medicineType?.message}</p>
                )}
              </Form.Group>

              <Form.Group
                className="grid mb-4 text-neutral-500"
                controlId="formBasicOptions"
              >
                <Form.Label className="mb-1">*Imagem</Form.Label>
                <Form.Control
                  aria-label="Seleção padrão"
                  className="w-full rounded border-2 bg-white border-gray-400 p-3 outline-none max-h-50 "
                  type="file"
                  accept="image/*"
                  name="productImage"
                  value={product.productImage}
                  {...register("productImage")}
                  onChange={handleChange}
                />
                {errors.productImage && (
                  <p className="text-red-500">{errors.productImage?.message}</p>
                )}
              </Form.Group>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <Button
            type="submit"
            className="w-full max-h-14 mt-5 lg:w-60 bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg  rounded-lg px-10 py-3"
          >
            Cadastrar
          </Button>
          <Button
            type="submit"
            className="w-full max-h-14 mt-5 lg:w-60 border-2 border-green-600 hover:bg-green-600  text-green-600 hover:text-neutral-100 font-semibold text-lg  rounded-lg px-10 py-3"
          >
            Limpar
          </Button>
        </div>
      </Form>
    </section>
  );
};
