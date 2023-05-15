import React from "react";
import { useNavigate } from "react-router-dom";

import "./css/AppBar.css";

import ACTIVE_ACCOUNT from "../assets/EngieAppBar/active/account.svg";
import ACTIVE_MAP from "../assets/EngieAppBar/active/map.svg";
import ACTIVE_PIN from "../assets/EngieAppBar/active/pin.svg";
import ACTIVE_BOLT from "../assets/EngieAppBar/active/bolt.svg";
import ACTIVE_CREDIT_CARD from "../assets/EngieAppBar/active/creditCard.svg";

import INACTIVE_ACCOUNT from "../assets/EngieAppBar/inactive/account.svg";
import INACTIVE_MAP from "../assets/EngieAppBar/inactive/map.svg";
import INACTIVE_PIN from "../assets/EngieAppBar/inactive/pin.svg";
import INACTIVE_BOLT from "../assets/EngieAppBar/inactive/bolt.svg";
import INACTIVE_CREDIT_CARD from "../assets/EngieAppBar/inactive/creditCard.svg";

export default function EngieAppBar(props) {
  const { active } = props;
  const navigate = useNavigate();

  function setActiveIcon(menuItem) {
    switch (menuItem) {
      case "stations":
        return active === "stations" ? ACTIVE_PIN : INACTIVE_PIN;
      case "itinerary":
        return active === "itinerary" ? ACTIVE_MAP : INACTIVE_MAP;
      case "charge":
        return active === "charge" ? ACTIVE_BOLT : INACTIVE_BOLT;
      case "card":
        return active === "card" ? ACTIVE_CREDIT_CARD : INACTIVE_CREDIT_CARD;
      case "account":
        return active === "account" ? ACTIVE_ACCOUNT : INACTIVE_ACCOUNT;
      default:
        return INACTIVE_PIN;
    }
  }

  return (
    <div className="navbar-container">
      <div className="menu">
        <span className="menu-item" onClick={() => navigate("/")}>
          <img src={setActiveIcon("stations")} alt="Pin" />
          Stations
        </span>
        <span className="menu-item" onClick={() => navigate("/itinerary")}>
          <img src={setActiveIcon("itinerary")} alt="Map" />
          Itinéraires
        </span>
        <span className="menu-item" onClick={() => navigate("/charge")}>
          <img src={setActiveIcon("charge")} alt="Charge" />
          Charge
        </span>
        <span className="menu-item" onClick={() => navigate("/card")}>
          <img src={setActiveIcon("card")} alt="Credit Card" />
          Ma Carte
        </span>
        <span className="menu-item" onClick={() => navigate("/account")}>
          <img src={setActiveIcon("account")} alt="Account" />
          Compte
        </span>
      </div>
      <div className="menu-xs">
        <span className="menu-item" onClick={() => navigate("/")}>
          <img src={setActiveIcon("stations")} alt="Pin" />
        </span>
        <span className="menu-item" onClick={() => navigate("/itinerary")}>
          <img src={setActiveIcon("itinerary")} alt="Map" />
        </span>
        <span className="menu-item" onClick={() => navigate("/charge")}>
          <img src={setActiveIcon("charge")} alt="Charge" />
        </span>
        <span className="menu-item" onClick={() => navigate("/card")}>
          <img src={setActiveIcon("card")} alt="Credit Card" />
        </span>
        <span className="menu-item" onClick={() => navigate("/account")}>
          <img src={setActiveIcon("account")} alt="Account" />
        </span>
      </div>
    </div>
  );
}
