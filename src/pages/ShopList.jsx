import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle, AiFillEdit } from "react-icons/ai";
import ReactModal from "react-modal";
import { MapShop } from "../components/Map";

ReactModal.setAppElement("#root");

export const ShopList = () => {
  const [shopList, setShopList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState({});

  useEffect(() => {
    //recupera a chave Loja e salva em shopList
    const storedShopList = JSON.parse(localStorage.getItem("Lojas")) || [];
    setShopList(storedShopList);

    //Sempre que a Loja for atualizada de outra aba ou da mesma, o shopList é atualizado e renderiza os itens na tabela
    window.addEventListener("storage", () => {
      const updatedShopList = JSON.parse(localStorage.getItem("Lojas")) || [];
      setShopList(updatedShopList);
    });
  }, []);

  const handleOpenModal = (item) => {
    setSelectedShop(item);
    setModal(true);
  };

  return (
    <section className="pb-10">
      <MapShop />
      <h1 className="text-4xl text-center text-neutral-600 mb-6 mt-5">
        Lojas por região
      </h1>

      <hr className="pb-10" />
      <div className="container m-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-neutral-300 text-green-700">
              <th className="border-2 py-2 px-2 text-lg" id="pr">
                Empresa
              </th>
              <th className="border-2 py-2 px-2 text-lg" id="sc">
                Telefone
              </th>
              <th className="border-2 py-2 px-2 text-lg" id="sc">
                E-mail
              </th>
              <th className="border-2 py-2 px-2 text-lg w-32" id="sc">
                Edições
              </th>
            </tr>
          </thead>
          <tbody>
            {shopList.map((item, index) => (
              <tr key={index}>
                <td className="border-2 py-2 px-2">{item.businessName}</td>
                <td className="border-2">
                  <a
                    className=" py-2 px-2"
                    href="https://wa.me/5548984847948?text=Seja+bem+vindo"
                  >
                    {item.celPhone}
                  </a>
                </td>
                <td className="border-2 py-2 px-2">{item.email}</td>
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
                  Rua:{" "}
                </span>
                {selectedShop && selectedShop.street}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  N°:{" "}
                </span>
                {selectedShop && selectedShop.number}
              </p>
              <p className="text-neutral-600">
                <span className="mr-2 text-neutral-700 font-semibold">
                  Bairro:
                </span>
                {selectedShop && selectedShop.district}
              </p>
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
              {selectedShop && selectedShop.complement && (
                <p className="text-neutral-600">
                  <span className="mr-2 text-neutral-700 font-semibold">
                    Complemento:
                  </span>
                  {selectedShop.complement}
                </p>
              )}
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
    </section>
  );
};
