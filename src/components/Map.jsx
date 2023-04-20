import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ShopContext } from "../contexts/ShopContext";

export const MapShop = () => {
  const { shop, center, zoom } = useContext(ShopContext);

  return (
    <section>
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
