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

  const [haveBorneID, setHaveBorneID] = useState(true);
  const [borneID, setBorneID] = useState('');

  const [carBattery, setCarBattery] = useState(0);
  const [wantedCharge, setWantedCharge] = useState(carBattery || 0);

  const maxChargeWanted = 55;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSlider = (e) => {
    setWantedCharge(e.target.value);
  };
  const handleBorneID = (e) => {
    setHaveBorneID(true);
    setBorneID(e);
  };

  useEffect(() => {
    const getCarInfo = async () => {
      const carInfoRef = doc(db, "users", userUID);
      const carInfoSnap = await getDoc(carInfoRef);
      if (carInfoSnap.exists()) {
        const batteryValue = carInfoSnap.data().carPerso.battery;
        setCarBattery(batteryValue);
        setWantedCharge(batteryValue);
      }
    };
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
            <img src={chargeIcon} />
            <p>26 min de charge</p>
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
        <div className="start-charge">
          <button onClick={() => setHaveSettings(true)}>Commencer la charge</button>
        </div>
        <EngieAppBar active='charge' />
      </div>
    );
  }
}