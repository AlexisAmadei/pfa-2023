import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './script.js';

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

function App() {
  return (
    <div>
      <div id="recherche">
        <input type="text" id="departureInput" placeholder="Point de départ" />
        <input type="text" id="destinationInput" placeholder="Point d'arrivée" />
        <ul id="results"></ul>
      </div>
      <script src="script.js"></script>
      <div id="conteneurDeTitre">
        <h1>Mon véhicule</h1>
      </div>
      <div id="conteneurDeVoiture">
        <div className="carteDeVoiture">
          <div className="photoVoiture">
            <img src="peugeot image presentation.jpg" alt="Peugeot E208" />
            <p>Peugeot e-208 modèle 2021: 350 km d'autonomie</p>
            <p>Consommation d'énergie est de 15 kWh/100 km: 52,5 kWh d'autonomie</p>
          </div>
        </div>
        <div id="ajouterUneVoiture">
          <div className="ajouterVoitureIcone">+</div>
        </div>
      </div>

      <div className="slider-container">
        <label htmlFor="chargeDepart">Charge de départ :</label>
        <input type="range" id="chargeDepart" min="0" max="100" defaultValue="50" />
        <span id="chargeDepartValue">50%</span>
      </div>

      <div className="slider-container">
        <label htmlFor="energieArrivee">Énergie d'arrivée souhaitée :</label>
        <input type="range" id="energieArrivee" min="0" max="100" defaultValue="50" />
        <span id="energieArriveeValue">50%</span>
      </div>

      <div className="slider-container">
        <label htmlFor="nombrePoses">Nombre de poses :</label>
        <input type="number" id="nombrePoses" min="0" max="10" defaultValue="5" />
      </div>

      <div className="itineraire-container">
        <button id="creerItineraire">Créer un itinéraire</button>
      </div>
      <footer>
  <div className="footer-container">
    <ul>
      <li>
        <a href="#">
          <img src="ph_map-pin-line-lightstations proche.png" alt="station la plus proche" />
          Stations
        </a>
      </li>
      <li>
        <a href="trajet.html">
          <img src="carte pour borne de recharge.png" alt="station la plus proche" />
          Itinéraire
        </a>
      </li>
      <li>
        <a href="#">
          <img src="iconoir_flashcharge de battrie.png" alt="station la plus proche" />
          Charge
        </a>
      </li>
      <li>
        <a href="#">
          <img src="Group 1wallet.png" alt="station la plus proche" />
          Ma carte
        </a>
      </li>
      <li>
        <a href="#">
          <img src="user.png" alt="station la plus proche" />
          Compte
        </a>
      </li>
    </ul>
  </div>
</footer>