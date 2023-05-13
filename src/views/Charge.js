import React, { useEffect, useState } from "react";

import "../css/Charge.css";
import EngieAppBar from "../components/EngieAppBar";
import QRreader from "../components/QRreader";
import ProgressCircle from "../components/ProgressCircle";
import chargeIcon from "../assets/chargeIcon.svg";

import '@engie-group/fluid-design-tokens/lib/css/tokens.css';
import '@engie-group/fluid-design-system/lib/base.css';

import { NJInputSearch } from '@engie-group/fluid-design-system-react';

import Checkbox from '@mui/material/Checkbox';
import CircleChecked from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';

import { db } from "../config/configFirebase";
import { doc, getDoc } from "firebase/firestore";
const userUID = "yiRokmNDgGAc4czw1sIQ";

export default function Charge() {
  const [checked, setChecked] = useState(false);
  const [haveSettings, setHaveSettings] = useState(false);

  const [haveBorneID, setHaveBorneID] = useState(true); // true pour dev
  const [borneID, setBorneID] = useState("");
  const [bornePower, setBornePower] = useState(50);
  const [getQR, setGetQR] = useState('');

  const [carBattery, setCarBattery] = useState(0);
  const [carMaxCapacity, setCarMaxCapacity] = useState(0);
  const [carMaxAutonomy, setCarMaxAutonomy] = useState(0);
  const [carCurrentCapacity, setCurrentCarCapacity] = useState(0);
  const [wantedCharge, setWantedCharge] = useState(carBattery || 0);
  const [delta, setDelta] = useState(0);

  const [timeToCharge, setTimeToCharge] = useState(0);
  const [costToCharge, setCostToCharge] = useState(0);
  const [autonomy, setAutonomy] = useState(0);
  const [newAutonomy, setNewAutonomy] = useState(0);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSlider = (e) => {
    setWantedCharge(e.target.value);
  };
  const getBornePower = async () => {
    const docRef = doc(db, "bornes", borneID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBornePower(docSnap.data().power);
    }
  };
  const handleBorneID = async (e) => {
    const docRef = doc(db, "bornes", e);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setHaveBorneID(true);
      setBorneID(e);
      getBornePower();
    } else {
      alert("Cette borne n'existe pas");
      console.error("Qr code invalide");
    }
  };

  function getNewAutonomy() { setNewAutonomy(((wantedCharge / 100) * carMaxAutonomy).toFixed(0)); }

  useEffect(() => { // get all infos on render then shouldn't update
    const getCarInfo = async () => {
      const carUserRef = doc(db, "users", userUID);
      const carUserSnap = await getDoc(carUserRef);
      let batteryValue = null;
      let carRef = null;
      let carSnap = null;

      if (carUserSnap.exists()) {
        batteryValue = carUserSnap.data().carPro.battery;
        setCarBattery(batteryValue);
        setWantedCharge(batteryValue);
        carRef = doc(db, "cars", carUserSnap.data().carPro.name);
        carSnap = await getDoc(carRef);
        if (carSnap.exists()) {
          setCarMaxCapacity(carSnap.data().capacity);
          setCarMaxAutonomy(carSnap.data().autonomy);
          const autonomy = ((carBattery / 100) * carSnap.data().autonomy).toFixed(0);
          setAutonomy(autonomy);
        }
      }
    };
    getCarInfo();
  }, [autonomy]);

  useEffect(() => {
    if (getQR !== '') { handleBorneID(getQR); }
  }, [getQR]);

  useEffect(() => {
    getNewAutonomy()
  }, [wantedCharge, carMaxAutonomy]);

  if (!haveBorneID) {
    return (
      <div className="first-view">
        <div className="charge-header">
          <p><span>Se connecter</span> à la borne</p>
        </div>
        <div className="qr-reader">
          <QRreader getReturnValue={(getQR) => setGetQR(getQR)} />
        </div>
        <div>
          <p id="mid-page">ou</p>
          <p>Rentrez son code d'authentification</p>
          <NJInputSearch
            label="Search"
            onEnterKeyPress={(e) => handleBorneID(e.currentTarget.value)}
          />
        </div>
        <EngieAppBar active='charge' />
      </div>
    );
  } else if (!haveSettings) {
    return (
      <div className="preview-charge">
        <div className="charge-header">
          <p><span>Paramètres</span> de recharge</p>
        </div>
        <div className="suggest-charge-container">
          <p style={{ marginBottom: '8px' }}>Charge recommandée pour l'itinéraire</p>
          <div className="suggest-charge">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
            }}>
              <img src={chargeIcon} />
              <p>26 min de charge</p>
            </div>
            <Checkbox
              id="checkbox"
              checked={checked}
              checkedIcon={<CircleChecked />}
              icon={<CircleUnchecked />}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
        <div className="slider">
          <input id="slider" type="range" min={carBattery} max={100} step={1} value={wantedCharge} onChange={(e) => handleSlider(e)} />
        </div>
        <div className="progress-circle">
          <ProgressCircle
            percentage={wantedCharge}
            circleWidth={200}
            current={carBattery}
          />
        </div>
        <div className="preview-stats">
          <div className="preview-stats-item">
            <p>Temps</p>
            <p id="stats-value">{timeToCharge}h</p>
          </div>
          <div className="preview-stats-item">
            <p>Coût de charge</p>
            <p id="stats-value">{costToCharge}€</p>
          </div>
          <div className="preview-stats-item">
            <p>Autonomie</p>
            <p id="stats-value">~ {newAutonomy}km</p>
          </div>
        </div>
        <p>delta charge: {delta}</p>
        {delta > 0 ?
          <div className="start-charge">
            <button id="ready" onClick={() => setHaveSettings(true)}>Lancez la recharge</button>
          </div> :
          <div className="start-charge">
            <button id="not-ready">Lancez la recharge</button>
          </div>
        }
        <EngieAppBar active='charge' />
      </div>
    );
  }
}