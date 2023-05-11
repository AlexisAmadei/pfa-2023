import React from "react";

import "../css/Charge.css";
import EngieAppBar from "../components/EngieAppBar";
import QRreader from "../components/QRreader";

export default function Charge() {
  return (
    <div>
      <div className="charge-header">
        <p><span>Se connecter</span> à la borne</p>
      </div>
      <div className="qr-reader">
        <QRreader />
      </div>
      <EngieAppBar />
    </div>
  );
}