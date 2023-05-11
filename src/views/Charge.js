import React from "react";

import "../css/Charge.css";
import EngieAppBar from "../components/EngieAppBar";

export default function Charge() {
  return (
    <div>
      <div className="charge-header">
        <p><span>Se connecter</span> à la borne</p>
      </div>
      <EngieAppBar />
    </div>
  );
}