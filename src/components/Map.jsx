import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapShop = () => {

  return (
    <MapContainer center={position} zoom={13} style={{ height: "450px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          <h2>Dados da loja</h2>
          <div className="flex gap-2">
            <div>
              {`
                 Celular:  ${shop.celPhone}, 
                 Telefone: ${shop.phoneNumber}
                 E-mail: ${shop.email}, 
                 Razão social: ${shop.businessName}, 
                 Nome Fatasia: ${shop.fantasyName}, 
                 CNPJ: ${shop.cnpj}, 
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
    </MapContainer>
  );
};
