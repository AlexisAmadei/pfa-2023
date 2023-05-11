import React, { useState } from "react";

import "../css/Charge.css";
import EngieAppBar from "../components/EngieAppBar";
import QRreader from "../components/QRreader";

import '@engie-group/fluid-design-tokens/lib/css/tokens.css';
import '@engie-group/fluid-design-system/lib/base.css';
import { NJInputSearch } from '@engie-group/fluid-design-system-react';
import ProgressCircle from "../components/ProgressCircle";

import Checkbox from '@mui/material/Checkbox';

export default function Charge() {
  const [haveBorneID, setHaveBorneID] = useState(true);
  const [borneID, setBorneID] = useState('');
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  if (!haveBorneID) {
    return (
      <div>
        <div className="charge-header">
          <p><span>Se connecter</span> à la borne</p>
        </div>
        <div className="qr-reader">
          <QRreader />
        </div>
        <NJInputSearch
          label="Search"
          onChange={function noRefCheck() { }}
          onClick={function noRefCheck() { }}
          onEnterKeyPress={(e) => setHaveBorneID(true)}
        />
        <EngieAppBar />
      </div>
    );
  }
  return (
    <div>
      <div className="charge-header">
        <p><span>Paramètres</span> de recharge</p>
      </div>
      <div className="suggest-charge">
        <p>charge suggérée
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </p>
        <input type="range" min={0} max={100} />
        <ProgressCircle progress={5} />
      </div>
    </div>
  );
}