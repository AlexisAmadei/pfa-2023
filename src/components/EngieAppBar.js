import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/AppBar.css";

import ACCOUNT from "../assets/account.svg";
import MAP from "../assets/map.svg";
import PIN from "../assets/pin.svg";
import BOLT from "../assets/bolt.svg";
import CREDIT_CARD from "../assets/creditCard.svg";

export default function EngieAppBar() {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <div className="menu">
        <span className="menu-item" onClick={() => navigate("/")}><img src={PIN} alt="Pin" />Stations</span>
        <span className="menu-item" onClick={() => navigate("/itinerary")}><img src={MAP} alt="Map" />Itinéraires</span>
        <span className="menu-item" onClick={() => navigate("/charge")}><img src={BOLT} alt="Charge" />Charge</span>
        <span className="menu-item" onClick={() => navigate("/card")}><img src={CREDIT_CARD} alt="Credit Card" />Ma Carte</span>
        <span className="menu-item" onClick={() => navigate("/account")}><img src={ACCOUNT} alt="Account" />Compte</span>
      </div>
      <div className="menu-xs">
        <span className="menu-item" onClick={() => navigate("/")}><img src={PIN} alt="Pin" /></span>
        <span className="menu-item" onClick={() => navigate("/itinerary")}><img src={MAP} alt="Map" /></span>
        <span className="menu-item" onClick={() => navigate("/charge")}><img src={BOLT} alt="Charge" /></span>
        <span className="menu-item" onClick={() => navigate("/card")}><img src={CREDIT_CARD} alt="Credit Card" /></span>
        <span className="menu-item" onClick={() => navigate("/account")}><img src={ACCOUNT} alt="Account" /></span>
      </div>
    </div>
  )
}
