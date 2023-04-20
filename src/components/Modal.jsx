import React, { useContext } from "react";
import ReactModal from "react-modal";
import { ShopContext } from "../contexts/ShopContext";
import { Button } from "react-bootstrap";

ReactModal.setAppElement("#root");

export const Modal = () => {
  const { modal, setModal, selectedShop } = useContext(ShopContext);

  return (
    <div>
      <ReactModal
        isOpen={modal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0 ,0, 0.5)",
            zIndex: 9999,
          },
          content: {
            border: "1px solid #fff",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "2rem",
            maxWidth: "40rem",
            maxHeight: "40rem",
            margin: "auto",
            zIndex: 10000,
          },
        }}
      >
        <div className="max-w-lg">
          <h2 className="text-xl text-neutral-700 text-center mb-5">
            Informações do item
          </h2>
          <div>
            <div>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Razão Social:
                </span>
                {selectedShop && selectedShop.businessName}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Nome Fantasia:
                </span>
                {selectedShop && selectedShop.fantasyName}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  CNPJ:
                </span>

                {selectedShop && selectedShop.cnpj}
              </p>
            </div>
            <div>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Celular:
                </span>
                {selectedShop && selectedShop.celPhone}
              </p>
              {selectedShop && selectedShop.phoneNumber && (
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Telefone:
                  </span>
                  {selectedShop.phoneNumber}
                </p>
              )}
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  E-mail:
                </span>
                {selectedShop && selectedShop.email}
              </p>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <div>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Rua:
                </span>
                {selectedShop && selectedShop.street}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">N°:</span>
                {selectedShop && selectedShop.number}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Bairro:
                </span>
                {selectedShop && selectedShop.district}
              </p>
              {selectedShop && selectedShop.complement && (
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Complemento:
                  </span>
                  {selectedShop.complement}
                </p>
              )}
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Cidade:
                </span>
                {selectedShop && selectedShop.city}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Estado:
                </span>
                {selectedShop && selectedShop.uf}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  CEP:
                </span>
                {selectedShop && selectedShop.cep}
              </p>
            </div>
          </div>
          <Button
            className=" bg-green-600 hover:bg-green-500 text-neutral-100 font-semibold text-lg  rounded-lg px-6 py-2 mt-5"
            onClick={() => setModal(false)}
          >
            Fechar
          </Button>
        </div>
      </ReactModal>
    </div>
  );
};
