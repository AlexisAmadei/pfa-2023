import React from "react";

import "../css/AppBar.css";

import ACCOUNT from "../assets/account.svg";
import MAP from "../assets/map.svg";
import PIN from "../assets/pin.svg";
import BOLT from "../assets/bolt.svg";
import CREDIT_CARD from "../assets/creditCard.svg";

export default function AppBar() {
  return (
    <div className="navbar-container">
      <ol className="menu-list">
        <li className="menu-item"><img src={PIN} alt="Pin" />Stations</li>
        <li className="menu-item"><img src={MAP} alt="Map" />Itinéraires</li>
        <li className="menu-item"><img src={BOLT} alt="Charge" />Charge</li>
        <li className="menu-item"><img src={CREDIT_CARD} alt="Credit Card" />Ma Carte</li>
        <li className="menu-item"><img src={ACCOUNT} alt="Account" />Compte</li>
      </ol>
    </div>
  )
}