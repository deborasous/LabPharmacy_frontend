import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CgTrash } from "react-icons/cg";
import ReactModal from "react-modal";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";
import { ModalShop } from "../components/Modal";

ReactModal.setAppElement("#root");

export const ShopList = () => {
  const { shopList, removeShop, position, handleOpenModal } =
    useContext(ShopContext);

  return (
    <section className="container m-auto my-12">
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
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "450px", marginTop: "60px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shopList.map((item, index) => (
          <Marker key={index} position={position}>
            <Popup>
              <h2>{item.businessName}</h2>
              <div>
                <p>
                  {item.street}, {item.number}
                </p>
                <p>{item.complement}</p>
                <p>{item.district}</p>
                <p>
                  {item.city} - {item.uf}
                </p>
                <p>{item.cep}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};
