import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AiOutlineSearch } from "react-icons/ai";
import { ShopContext } from "../contexts/ShopContext";

export const MapShop = () => {
  const {
    center,
    zoom,
    position,
    searchTerm,
    handleSearchInputChange,
    handleSearchInputBlur,
    filteredShop,
  } = useContext(ShopContext);

  return (
    <section>
      <div className="max-w-md mx-auto mb-10 border-2 border-neutral-300 rounded-md">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <AiOutlineSearch className="text-2xl" />
          </div>

          <input
            className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onBlur={handleSearchInputBlur}
          />
        </div>
      </div>

      <MapContainer center={center} zoom={zoom} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {filteredShop.map((item) => (
          <Marker position={position}>
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
