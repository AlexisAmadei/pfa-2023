import React from 'react';

const firebaseConfig = {
  // configuration directement récupérée sur Firebase
  apiKey: "AIzaSyCD_6R6vtnfuokVEttrozoFY2jqnscYdFs",
  authDomain: "pfa-engie-51e7f.firebaseapp.com",
  projectId: "pfa-engie-51e7f",
  storageBucket: "pfa-engie-51e7f.appspot.com",
  messagingSenderId: "345072114546",
  appId: "1:345072114546:web:59dd885025fe0b5dd51beb",
  measurementId: "G-NKGDHB0DH1"
};

firebase.initializeApp(firebaseConfig);

function Itineraire() {
  return (
    <div id="itineraire">
      <input type="text" id="departureInput" placeholder="Point de départ" />
      <input type="text" id="destinationInput" placeholder="Point d'arrivée" />
      <ul id="results"></ul>
    </div>
  );
}

function PrevisualisationTrajet() {
  return (
    <div className="previsualisationtrjet">
      <div className="content">
        <div className="time-distance">
          <p>5h02 min</p>
          <p>479km</p>
        </div>
        <div className="buttondeprix">
          <button className="custom-button">Péage + recharge ~ 43,50€</button>
        </div>
        <div className="vertical-line">
          <div className="point">
            <div className="point-text">26min Aire de Chartres Gasville (Engie)</div>
          </div>
          <div className="point">
            <div className="point-text">31min Aire de Longué-Les-Cossonières (Ionity)</div>
          </div>
        </div>
        <div className="charge-info">
          <p>Charge à l'arrivée : 20%</p>
        </div>
      </div>
    </div>
  );
}

function PrevisualisationTrajet2() {
  return (
    <div className="previsualisationtrjet2">
      <div className="content">
        <div className="time-distance">
          <p>5h56 min</p>
          <p>544km</p>
        </div>
        <div className="buttondeprix">
          <button className="custom-button">Péage + recharge ~ 56,50€</button>
        </div>
        <div className="vertical-line">
          <div className="point">
            <div className="point-text">25min Aire de Beaugency Messas (Total)</div>
          </div>
          <div className="point">
            <div className="point-text">40min Aire de Longué-Les-Cossonières (Ionity)</div>
          </div>
        </div>
        <div className="charge-info">
          <p>Charge à l'arrivée : 20%</p>
        </div>
      </div>
    </div>
  );
}

function ItineraireContainer() {
  function showPopup() {
    var popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "block";
  }

  return (
    <div className="itineraire-container">
      <button id="creerItineraire" onClick={showPopup}>Y aller</button>
    </div>
  );
} function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <ul>
          <li><a href="#"><img src="ph_map-pin-line-lightstations proche.png" alt="station la plus proche" />Stations</a></li>
          <li><a href="trajet.html"><img src="carte pour borne de recharge.png" alt="station la plus proche" />Itinéraire</a></li>
          <li><a href="#"><img src="iconoir_flashcharge de battrie.png" alt="station la plus proche" />Charge</a></li>
          <li><a href="#"><img src="Group 1wallet.png" alt="station la plus proche" />Ma carte</a></li>
          <li><a href="#"><img src="user.png" alt="station la plus proche" />Compte</a></li>
        </ul>
      </div>
    </footer>
  );
}