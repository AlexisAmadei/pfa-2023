import React, { useEffect, useState } from "react";

import "../css/Itinerary.css";
import LoupeIcon from "../assets/loupeIcon.svg";
import EngieAppBar from "../components/EngieAppBar";

import TextField from '@mui/material/TextField';
import { InputAdornment } from "@mui/material";

import { db, fakeUserUID } from "../config/configFirebase";
import { doc, getDoc } from "firebase/firestore";

export default function Itinerary() {
  const [userDoc, setUserDoc] = useState("");
  const [carPerso, setCarPerso] = useState("");
  const [carPro, setCarPro] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", fakeUserUID);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserDoc(userSnap.data());
      else console.error("No such car in db.");
    };
    fetchUserData();
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

  return (
    <div>
      <div className="itinerary-container">
        <div className="search-container">
          {/* <span className="add-search">+</span> */}
          <TextField className="address-searchBar" id="outlined-basic" variant="outlined"
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
            }}
          />
          <TextField className="address-searchBar" id="outlined-basic" variant="outlined"
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
              ),
            }}
          />
        </div>
        <div className="car-selection">
          <h1>Mon véhicule</h1>
          <div className="car-selection-card">
            {userDoc.carPerso && (
              <div className="car-item">
                <img id="carIMG" height={20} src={carPerso.img} alt="car image" />
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