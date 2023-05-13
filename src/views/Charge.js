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

  const [haveBorneID, setHaveBorneID] = useState(false);
  const [borneID, setBorneID] = useState("");
  const [bornePower, setBornePower] = useState(0);

  const [carBattery, setCarBattery] = useState(0);
  const [wantedCharge, setWantedCharge] = useState(carBattery || 0);

  const [timeToCharge, setTimeToCharge] = useState(0);
  const [costToCharge, setCostToCharge] = useState(0);
  const [autonomy, setAutonomy] = useState(0);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSlider = (e) => {
    setWantedCharge(e.target.value);
  };
  const getBornePower = async() => {
    console.log(borneID);
    const docRef = doc(db, "bornes", borneID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBornePower(docSnap.data().power);
      console.log(bornePower);
    }
  };
  const handleBorneID = (e) => {
    setHaveBorneID(true);
    setBorneID(e);
    getBornePower();
  };

  function getDeltaCharge() {
    let deltaCharge = wantedCharge - carBattery;
    return deltaCharge;
  };


  useEffect(() => {
    function getInfoToCharge() {
      setTimeToCharge((100 * (100 - carBattery)) / bornePower);
      setCostToCharge((100 * (100 - carBattery)) * 0.55);
    };
    const getCarInfo = async () => {
      const carInfoRef = doc(db, "users", userUID);
      const carInfoSnap = await getDoc(carInfoRef);
      if (carInfoSnap.exists()) {
        const batteryValue = carInfoSnap.data().carPerso.battery;
        setCarBattery(batteryValue);
        setWantedCharge(batteryValue);
      }
    };
    getInfoToCharge();
    getCarInfo();
  }, []);

  if (!haveBorneID) {
    return (
      <div className="first-view">
        <div className="charge-header">
          <p><span>Se connecter</span> à la borne</p>
        </div>
        <div className="qr-reader">
          <QRreader />
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
            <p id="stats-value">1h 30</p>
          </div>
          <div className="preview-stats-item">
            <p>Coût de charge</p>
            <p id="stats-value">2,50€</p>
          </div>
          <div className="preview-stats-item">
            <p>Autonomie</p>
            <p id="stats-value">~ 300km</p>
          </div>
        </div>
        <p>delta charge: {getDeltaCharge()}</p>
        {getDeltaCharge() > 0 ?
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