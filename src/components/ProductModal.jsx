import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import ReactModal from "react-modal";
import Imagem1 from "../assets/image-products/imagem1.png";
import Imagem2 from "../assets/image-products/imagem2.png";
import { ProductContext } from "../contexts/ProductContext";

ReactModal.setAppElement("#root");

export const ProductModal = () => {
  const { productList, modal, setModal, selectedProduct } =
    useContext(ProductContext);

  return (
    <div>
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
            maxWidth: "50rem",

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
                {selectedProduct && selectedProduct.medicineName}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Laboratorio:
                </span>
                {selectedProduct && selectedProduct.labName}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Dosagem:
                </span>

                {selectedProduct && selectedProduct.dosage}
              </p>
            </div>
            <div>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Tipo:
                </span>
                {selectedProduct && selectedProduct.medicineType}
              </p>
              {selectedProduct && selectedProduct.price && (
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Preço:
                  </span>
                  {selectedProduct.price}
                </p>
              )}
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Descrição:
                </span>
                {selectedProduct && selectedProduct.description}
              </p>
            </div>
          </div>
          <hr className="my-5" />
          <div className="mb-5">
            <p className="text-neutral-600">
              {productList.medicineType === "Comum" ? (
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
            className=" bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg  rounded-lg px-10 py-2"
            onClick={() => setModal(false)}
          >
            Fechar
          </Button>
        </div>
      </ReactModal>
    </div>
  );
};
