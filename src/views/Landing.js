import React from "react";

import OSP from "../components/OSMapIntegration";
import EngieAppBar from "../components/EngieAppBar";

import "../css/Landing.css"

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-footer">
        <EngieAppBar active="stations" />
      </div>
      <div className="map-container">
        <OSP />
      </div>
    </div>
  );
}
