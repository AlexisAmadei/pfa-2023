import React from "react";

import "../css/Summary.css";
import ProgressCircle from "../components/ProgressCircle";
import arrowVector from "../assets/arrowVector.svg";
import HeartIcon from "../assets/heart.svg";
import EngieAppBar from "../components/EngieAppBar";

export default function Summary({ startPercentage, endPercentage }) {
  let radius = 66;

  return (
    <div className="summary-container">
      <div className="summary-header">
        <p><span>Récapitulatif</span> de recharge</p>
      </div>
      <div className="summary-progressCircle">
        <ProgressCircle
          percentage={startPercentage}
          circleWidth={170}
          radius={radius}
          textSize='38px'
          lineWidth='12px'
        />
        <img src={arrowVector} alt="arrow" />
        <ProgressCircle
          percentage={endPercentage}
          circleWidth={170}
          radius={radius}
          textSize='38px'
          lineWidth='12px'
        />
      </div>
      <p id="charge-terminated">Votre recharge est terminée</p>
      <div className="summary-stats">
        <div className="upper-items">
          <div className="stats-item">
            <p>Prix total</p>
            <p id="stats-value">0€</p>
          </div>
          <div className="stats-item">
            <p id="item-title">Temps de recharge</p>
            <p id="stats-value">26 min</p>
          </div>
        </div>
        <div className="stats-item">
          <p>Gain d'autonomie</p>
          <p id="stats-value">~ 100km</p>
        </div>
        <p id="save-stats"><img src={HeartIcon} />Enregistrer les options de recharges</p>
        <button id="continue">Continuer</button>
      </div>
      <EngieAppBar active='charge' />
    </div>
  );
}