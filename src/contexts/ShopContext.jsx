import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shopList, setShopList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState({});
  const [shop, setShop] = useState([]);
  const [zipCodeSearched, setZipCodeSearched] = useState("");
  const [center, setCenter] = useState([-27.5974, -48.5495]);
  const [zoom, setZoom] = useState(13);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleCloseModal = () => {
    setModal(false);
  };

  const contextValues = {
    shopList,
    setShopList,
    modal,
    setModal,
    selectedShop,
    setSelectedShop,
    handleOpenModal,
    handleCloseModal,
    shop,
    setShop,
    zipCodeSearched,
    setZipCodeSearched,
    center,
    setCenter,
    zoom,
    setZoom,
    searchTerm,
    setSearchTerm,
  };

  return (
    <ShopContext.Provider value={contextValues}>
      {children}
    </ShopContext.Provider>
  );
};
