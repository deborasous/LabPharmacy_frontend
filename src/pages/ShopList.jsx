import React, { useContext } from "react";
import { AiOutlinePlusCircle, AiFillEdit } from "react-icons/ai";
import { MapShop } from "../components/Map";
import { ShopContext } from "../contexts/ShopContext";
import { Modal } from "../components/Modal";

export const ShopList = () => {
  const { shopList, handleOpenModal } = useContext(ShopContext);

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
      <Modal />
    </section>
  );
};
