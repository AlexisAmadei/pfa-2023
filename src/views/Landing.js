import React from "react";

import OSP from "../components/OSMapIntegration";
import EngieAppBar from "../components/EngieAppBar";

import TextField from '@mui/material/TextField';

import "../css/Landing.css"

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="map-container">
        <OSP />
      </div>
      <div className="search-box">
        <TextField className="address-searchBar" id="outlined-basic" label="Chercher une adresse" variant="outlined"
          fullWidth={true}
          sx={{
            backgroundColor: 'white',
            border: 'none',
          }}
        />
      </div>
      <div className="landing-footer">
        <EngieAppBar active="stations" />
      </div>
    </div>
  );
}
