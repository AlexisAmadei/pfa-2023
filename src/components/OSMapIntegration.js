import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from 'leaflet';

import IconButton from "@mui/material/IconButton";
import MyLocation from "@mui/icons-material/MyLocation";

import PosIcon from "../assets/posIcon.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/configFirebase";
import borneIcon from "../assets/borneIcon.svg";

const customIcon = L.icon({
  iconUrl: PosIcon,
  iconSize: [40, 40],
  iconAnchor: [12.5, 12.5],
  popupAnchor: [0, -12.5],
});

const bornesIconMap = L.icon({
  iconUrl: borneIcon,
  iconSize: [40, 40],
  iconAnchor: [12.5, 12.5],
  popupAnchor: [0, -12.5],
});

const CenterControl = ({ position }) => {
  const map = useMap();

  const centerView = () => { map.flyTo(position, map.getZoom()); };

  return (
    <IconButton
      onClick={centerView}
      sx={{
        position: "absolute",
        right: 15,
        bottom: 100,
        zIndex: 1000,
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "8px",
      }}
    >
      <MyLocation />
    </IconButton>
  );
};

const MapComponent = () => {
  const [position, setPosition] = useState([48.9, 2.45]);
  const [bornes, setBornes] = useState([]);

  useEffect(() => {
    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve([latitude, longitude]);
            },
            (error) => { reject(error); }
            );
          } else { reject(new Error("error")); }
        });
      };
      const fetchBornes = async () => {
        const querySnapshot = await getDocs(collection(db, "bornes"));
        const bornesData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const location = data.location;
          if (location && 'lat' in location && 'long' in location) {
            bornesData.push({
              id: doc.id,
              location: [location.lat, location.long]
            });
          }
        });
        setBornes(bornesData);
      };
      fetchBornes();
      getCurrentLocation()
      .then((coords) => { setPosition(coords); })
      .then(localStorage.setItem("currentLocation", position))
      .catch((error) => { console.error(error); });
    }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ width: "100%", height: "100%" }} attributionControl={false}>
      <TileLayer
        url="https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=iMEAad8rJHF7AsThEwIbTDJYGM5DnjY1riUcGYS7QLXXFAjlpkm7ABQofqe7HLZe"
      />
      {bornes.map(borne => (
        <Marker
          key={borne.id}
          position={borne.location}
          icon={bornesIconMap}
        />
      ))}
      <Marker position={position} icon={customIcon} />
      <CenterControl position={position} />
    </MapContainer>
  );
};

export default MapComponent;
