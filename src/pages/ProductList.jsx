import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle, AiFillEdit } from "react-icons/ai";
import ReactModal from "react-modal";
import Imagem1 from "../assets/image-products/imagem1.png";
import Imagem2 from "../assets/image-products/imagem2.png";

ReactModal.setAppElement("#root");

export const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState({});

  console.log(productList);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then(setProductList)
      .catch(console.dir);
  }, []);

  const handleOpenModal = (item) => {
    setSelectedShop(item);
    setModal(true);
  };

  return (
    <section className="pb-10">
      <h1 className="text-4xl text-center text-neutral-600 mb-6 mt-5">
        Lojas por região
      </h1>

      <hr className="pb-10" />
      <div className="container m-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-neutral-300 text-green-700">
              <th className="border-2 py-2 px-2 text-lg w-1/4">Medicamento</th>
              <th className="border-2 py-2 px-2 text-lg w-1/4">Laboratório</th>
              <th className="border-2 py-2 px-2 text-lg">Dosagem</th>
              <th className="border-2 py-2 px-2 text-lg ">Tipo</th>
              <th className="border-2 py-2 px-2 text-lg ">Preço</th>
              <th className="border-2 py-2 px-2 text-lg ">Imagem</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item, index) => (
              <tr key={index}>
                <td className="border-2 py-2 px-2">{item.medicineName}</td>
                <td className="border-2">{item.labName}</td>
                <td className="border-2 py-2 px-2">{item.dosage}</td>
                <td className="border-2 py-2 px-2">{item.medicineType}</td>
                <td className="border-2 py-2 px-2">{item.price}</td>
                <td className="border-2 py-2 px-2 ">
                  <div className="flex justify-around">
                    <button onClick={() => handleOpenModal(item)}>
                      <AiOutlinePlusCircle className="text-2xl text-green-700" />
                    </button>
                    <AiFillEdit className="text-2xl text-red-600" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactModal
        isOpen={modal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0 ,0, 0.5)",
          },
          content: {
            border: "1px solid #fff",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "2rem",
            maxWidth: "40rem",
            maxHeight: "31rem",
            margin: "auto",
          },
        }}
      >
        <div className="">
          <h2 className="text-xl text-neutral-700 text-center mb-5">
            Informações do item
          </h2>
          <div>
            <div>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Medicamento
                </span>
                {selectedShop && selectedShop.medicineName}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Laboratorio:
                </span>
                {selectedShop && selectedShop.labName}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Dosagem:
                </span>

                {selectedShop && selectedShop.dosage}
              </p>
            </div>
            <div>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Tipo:
                </span>
                {selectedShop && selectedShop.medicineType}
              </p>
              {selectedShop && selectedShop.price && (
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Preço:
                  </span>
                  {selectedShop.price}
                </p>
              )}
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Descrição:
                </span>
                {selectedShop && selectedShop.description}
              </p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <p className="text-neutral-600">
              {selectedShop.medicineType === "Comum" ? (
                <img
                  src={Imagem1}
                  alt="Imagem 1"
                  className="mt-2 w-52  m-auto"
                />
              ) : (
                <img
                  src={Imagem2}
                  alt="Imagem 2"
                  className="mt-2 w-52  m-auto"
                />
              )}
            </p>
          </div>
          <Button
            className=" bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg  rounded-lg px-6 py-2 mt-5"
            onClick={() => setModal(false)}
          >
            Fechar
          </Button>
        </div>
      </ReactModal>
    </section>
  );
};
