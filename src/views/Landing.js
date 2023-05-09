import React from "react";

import OSP from "../components/OSMapIntegration";
import AppBar from "../components/AppBar";

import "../css/Landing.css"
import SwipeableEdgeDrawer from "../components/SwipeableDrawer";
import ResizableSearchInput from "../components/ResizableSearchInput";

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="map-container">
        <OSP />
      </div>
      <div className="landing-footer">
        {/* <ResizableSearchInput /> */}
        <AppBar />
      </div>
    </div>
  );
}