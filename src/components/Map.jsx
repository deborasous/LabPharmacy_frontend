import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

export const MapShop = () => {
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState([]);
  const [zipCodeSearched, setZipCodeSearched] = useState("");
  const [center, setCenter] = useState([-27.5974, -48.5495]);
  const [zoom, setZoom] = useState(13);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    const storedShopList = JSON.parse(localStorage.getItem("Lojas")) || [];
    setShopList(storedShopList);

    window.addEventListener("storage", () => {
      const updatedShopList = JSON.parse(localStorage.getItem("Lojas")) || [];
      setShopList(updatedShopList);
    });
  }, []);

  useEffect(() => {
    async function fetchShop() {
      const shopComCoordenadas = await Promise.all(
        shopList.map(async (shop) => {
          const url = `https://nominatim.openstreetmap.org/search?q=${shop.cep}, Brazil&format=json`;

          try {
            const response = await axios.get(url);
            if (response.data.length > 0) {
              const { lat, lon } = response.data[0];
              return {
                ...shop,
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
              };
            }
          } catch (error) {
            console.error(error);
          }

          return shop;
        })
      );

      setShop(shopComCoordenadas);
    }

    fetchShop();
  }, [shopList]);

  return (
    <section>
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineSearch className="text-2xl text-neutral-500" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-base text-neutral-600 border border-gray-300 rounded-lg bg-gray-50 focus:border-neutral-400 focus:ring-green-300 dark:bg-neutral-600 dark:border-neutral-600 dark:placeholder-neutral-600 dark:text-white dark:focus:ring-green-800 dark:focus:border-green-500 outline-none"
            placeholder="Pesquisar lojas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-gree dark:focus:ring-green-800"
          >
            Pesquisar
          </button>
        </div>
      </div>
      <MapContainer center={center} zoom={zoom} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shop.map((shop, index) => (
          <Marker key={index} position={[shop.latitude, shop.longitude]}>
            <Popup>
              <div className="flex gap-2">
                <div>
                  {`
                  ${shop.celPhone}, 
                  ${shop.phoneNumber}
                  ${shop.email}, 
                  ${shop.businessName}, 
                  ${shop.fantasyName}, 
                  ${shop.cnpj}, 
                  `}
                </div>
                <div>
                  {`
                  ${shop.street}, 
                  ${shop.number}, 
                  ${shop.complement},
                  ${shop.district},
                  ${shop.city} /
                  ${shop.uf}
                  ${shop.cep} 
                  `}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};
