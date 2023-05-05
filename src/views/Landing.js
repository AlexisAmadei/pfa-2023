import React from "react";

// import MapIntegration from "../components/GoogleMapIntegration";
import OSP from "../components/OSMapIntegration";
import AppBar from "../components/AppBar";

import "../css/Landing.css"
import SwipeableEdgeDrawer from "../components/SwipeableDrawer";

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="map-container">
        <OSP />
      </div>
      <div className="swipeable-drawer-container">
        <SwipeableEdgeDrawer />
      </div>
      <AppBar />
    </div>
  );
}