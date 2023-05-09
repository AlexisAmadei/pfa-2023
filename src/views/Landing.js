import React from "react";

import OSP from "../components/OSMapIntegration";
import EngieAppBar from "../components/EngieAppBar";

import "../css/Landing.css"

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="map-container">
        <OSP />
      </div>
      <div className="landing-footer">
        {/* <ResizableSearchInput /> */}
        <EngieAppBar />
      </div>
    </div>
  );
}
