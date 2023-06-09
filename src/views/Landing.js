import React, { useState } from "react";

import OSP from "../components/OSMapIntegration";
import EngieAppBar from "../components/EngieAppBar";
import TextField from '@mui/material/TextField';
import "../css/Landing.css"
import LoupeIcon from "../assets/loupeIcon.svg";
import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  function sendAddress(e) {
    if (e.key !== "Enter") return;
    localStorage.setItem("destination", e.target.value);
    navigate("/itinerary");
  }

  return (
    <div className="landing-container">
      <div className="map-container">
        <OSP />
      </div>
      <div className="search-box">
        <TextField className="address-searchBar" id="outlined-basic" variant="outlined"
          placeholder="Chercher une adresse"
          fullWidth={true}
          sx={{
            backgroundColor: 'white',
            border: 'none',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={LoupeIcon} alt="loupe" />
              </InputAdornment>
            ),
          }}
          onKeyDown={(e) => {sendAddress(e)}}
        />
      </div>
      <div className="landing-footer">
        <EngieAppBar active="stations" />
      </div>
    </div>
  );
}
