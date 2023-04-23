import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CgTrash } from "react-icons/cg";
import ReactModal from "react-modal";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import { ModalShop } from "../components/ModalShop";
import { MapShop } from "../components/Map";

ReactModal.setAppElement("#root");

export const ShopList = () => {
  const { removeShop, handleOpenModal, filteredShop } = useContext(ShopContext);

  return (
    <section className="container m-auto my-12">
      <h1 className="text-4xl text-center text-neutral-600 mb-6 mt-5">
        Lojas por região
      </h1>
      <MapShop />

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
            {filteredShop.map((item, index) => (
              <tr key={index}>
                <td className="border-2 py-2 px-2">{item.businessName}</td>
                <td className="border-2">
                  <Link
                    className=" py-2 px-2"
                    to="https://wa.me/5548984847948?text=Seja+bem+vindo"
                  >
                    {item.celPhone}
                  </Link>
                </td>
                <td className="border-2 py-2 px-2">{item.email}</td>
                <td className="border-2 py-2 px-2 ">
                  <div className="flex justify-around">
                    <Button onClick={() => handleOpenModal(item)}>
                      <AiOutlinePlusCircle className="text-2xl text-green-700" />
                    </Button>
                    <Button onClick={() => removeShop(item)}>
                      <CgTrash className="text-2xl text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalShop />
    </section>
  );
};
