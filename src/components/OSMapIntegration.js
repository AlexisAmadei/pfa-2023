import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const MapComponent = () => {
  const position = [51.505, -0.09]; // You can set this to your desired latitude and longitude
  let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  vh = vh - 96; // app bar height
  return (
    <MapContainer center={position} zoom={13} style={{ width: '100vw', height: `${vh}px` }}>
      <TileLayer
        url="https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=iMEAad8rJHF7AsThEwIbTDJYGM5DnjY1riUcGYS7QLXXFAjlpkm7ABQofqe7HLZe"
      />
    </MapContainer>
  );
};

export default MapComponent;
