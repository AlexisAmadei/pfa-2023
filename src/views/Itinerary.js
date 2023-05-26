import React, { useEffect, useState } from "react";

import "../css/Itinerary.css";
import LoupeIcon from "../assets/loupeIcon.svg";
import currentLocationIcon from "../assets/currentLocation.svg";
import EngieAppBar from "../components/EngieAppBar";
import PreviewMap from "../assets/Fond carte.png";
import ItineraryIcon from "../assets/ItineraryIcon.svg";
import fakePreview from "../assets/previewItinerary.png";

import TextField from '@mui/material/TextField';
import { InputAdornment } from "@mui/material";

import { db, fakeUserUID } from "../config/configFirebase";
import { doc, getDoc } from "firebase/firestore";

export default function Itinerary() {
  const [userDoc, setUserDoc] = useState("");
  const [carPerso, setCarPerso] = useState("");
  const [carPro, setCarPro] = useState("");

  // change view
  const [startItinerary, setStartItinerary] = useState(false);

  // slider values
  const [currentCharge, setCurrentCharge] = useState(0);
  const [wantedCharge, setWantedCharge] = useState(0);

  const [preFillCurrent, setPreFillCurrent] = useState("");
  const [clickable, setClickable] = useState(true);

  const handleSlider = (e, destination) => {
    if (destination === "current") setCurrentCharge(e.target.value);
    else setWantedCharge(e.target.value);
  };

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

  useEffect(() => {
    if (currentCharge && wantedCharge) setClickable(true);
    else setClickable(false);
  }, [currentCharge, wantedCharge]);

  const handleEndAdornmentClick = () => {
    const geolocation = JSON.parse(localStorage.getItem("geolocation")) || "";
    if (geolocation) setPreFillCurrent(`Lat: ${geolocation.lat}, Long: ${geolocation.lng}`);
  };

  if (!startItinerary) {
    return (
      <div>
        <div className="itinerary-container">
          <div className="search-container">
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
                      <img src={currentLocationIcon} height={22} alt="currentLocation" />
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
          <>
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
            <div className="slider-container">
              <div className="slider-item">
                <div className="text-label">
                  <span>Charge du véhicule avant de partir</span>
                  <span>{currentCharge}%</span>
                </div>
                <input type="range"
                  min="0" max="100"
                  value={currentCharge}
                  onChange={(e) => handleSlider(e, "current")}
                  className="slider" id="myRange"
                  style={{ background: `linear-gradient(90deg, #007ACD ${currentCharge}%, #EBEEF1 ${currentCharge}%` }}
                />
              </div>
              <div className="slider-item">
                <div className="text-label">
                  <span>Charge du véhicule à l'arrivée</span>
                  <span>{wantedCharge}%</span>
                </div>
                <input type="range"
                  min="0" max="100"
                  value={wantedCharge}
                  onChange={(e) => handleSlider(e, "destination")}
                  className="slider" id="myRange"
                  style={{
                    background: `linear-gradient(to right, #007ACD 0%, #007ACD ${wantedCharge}%, #EBEEF1 ${wantedCharge}%, #EBEEF1 100%)`
                  }}
                />
              </div>
            </div>
            {clickable && (<button id="ready" onClick={() => setStartItinerary(true)}>Commencer l'itinéraire</button>)}
            {!clickable && (<button id="not-ready">Commencer l'itinéraire</button>)}
          </>
        </div>

        <EngieAppBar active="itinerary" />
      </div>
    );
  } else {
    return (
      <div>
        <div className="itinerary-container">
          <div className="search-container">
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
                      <img src={currentLocationIcon} height={22} alt="currentLocation" />
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
          <div >
            <img src={PreviewMap} width={"100%"} alt="previewMap" />
          </div>
          <img src={fakePreview} alt="fake preview itinerary"></img>
          <div className="fake-blank"
            style={{
              height: '150px',
            }}
          ></div>
          <div style={{
            position: 'fixed',
            top: '87%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 1,
            overflow: 'auto',
          }}>
            <button id="start-itinerary" onClick={() => { window.open("https://waze.com/ul?ll=47.251266171564644,-1.4973706355821677&navigate=yes") }} >
              <img src={ItineraryIcon} alt="itinerary" />
              Y aller
            </button>
          </div>
        </div>
        <EngieAppBar active="itinerary" />
      </div>
    );
  }
};
