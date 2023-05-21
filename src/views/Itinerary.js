import React, { useEffect, useState } from "react";

import "../css/Itinerary.css";
import LoupeIcon from "../assets/loupeIcon.svg";
import currentLocationIcon from "../assets/currentLocation.svg";
import EngieAppBar from "../components/EngieAppBar";

import TextField from '@mui/material/TextField';
import { InputAdornment } from "@mui/material";

import { db, fakeUserUID } from "../config/configFirebase";
import { doc, getDoc } from "firebase/firestore";

export default function Itinerary() {
  const [userDoc, setUserDoc] = useState("");
  const [carPerso, setCarPerso] = useState("");
  const [carPro, setCarPro] = useState("");
  const [preFillCurrent, setPreFillCurrent] = useState("Position actuelle");

  useEffect(() => {
    function handleSetLocation() {
      let geolocation = "";
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          localStorage.setItem("geolocation", JSON.stringify(geolocation));
          console.log("mine->", geolocation);
          console.log("local", localStorage.getItem("geolocation"));
        });
      }
    };
    const fetchUserData = async () => {
      const userRef = doc(db, "users", fakeUserUID);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserDoc(userSnap.data());
      else console.error("No such car in db.");
    };
    fetchUserData();
    handleSetLocation();
  }, []);

  useEffect(() => {
    const fetchCarPerso = async () => {
      const carPersoRef = doc(db, "cars", userDoc.carPerso.name);
      const carPersoSnap = await getDoc(carPersoRef);
      if (carPersoSnap.exists()) setCarPerso(carPersoSnap.data());
      else console.error("No such car in db.");
    };
    const fetchCarPro = async () => {
      const carProRef = doc(db, "cars", userDoc.carPro.name);
      const carProSnap = await getDoc(carProRef);
      if (carProSnap.exists()) setCarPro(carProSnap.data());
      else console.error("No such car in db.");
    };
    if (userDoc) {
      fetchCarPerso();
      fetchCarPro();
    }
  }, [userDoc]);

  const handleEndAdornmentClick = () => {
    const geolocation = JSON.parse(localStorage.getItem("geolocation")) || "";
    if (geolocation) setPreFillCurrent(`Lat: ${geolocation.lat}, Long: ${geolocation.lng}`);
  };

  return (
    <div>
      <div className="itinerary-container">
        <div className="search-container">
          {/* <span className="add-search">+</span> */}
          <TextField className="address-searchBar" id="outlined-basic" variant="outlined"
            value={preFillCurrent}
            placeholder="Choisir un point de départ"
            fullWidth={true}
            sx={{
              backgroundColor: 'white',
              border: '1px solid black',
              margin: '10px 0',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={LoupeIcon} alt="loupe" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <button onClick={handleEndAdornmentClick} style={{ background: 'none', border: 'none' }}>
                    <img src={currentLocationIcon} height={28} alt="currentLocation" />
                  </button>
                </InputAdornment>
              )
            }}
          />
          <TextField className="address-searchBar" id="outlined-basic" variant="outlined"
            defaultValue={localStorage.getItem("destination")}
            placeholder="Choisir un point d'arrivée"
            fullWidth={true}
            sx={{
              backgroundColor: 'white',
              border: '1px solid black',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={LoupeIcon} alt="loupe" />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className="car-selection">
          <h1>Mon véhicule</h1>
          <div className="car-selection-card">
            {userDoc.carPerso && (
              <div className="car-item">
                <img id="carIMG" height={20} src={carPerso.img} alt="car" />
                <span id="carNAME">{userDoc.carPerso.name}</span>
                <span id="carAUTONOMY">{carPerso.autonomy}km</span>
                <span id="carPOWER">{carPerso.power}kw</span>
                <span id="car-label" style={{ color: "white" }}>Perso</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <EngieAppBar active="itinerary" />
    </div>
  );
}