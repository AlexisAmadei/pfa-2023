import React from "react";

import "../css/CarList.css";

export default function CarList() {
  return (
    <div className="car-list-container">
      <img id="carIMG" height={100} src="https://chargeguru.com/fr/wp-content/uploads/sites/4/2020/03/peugeot-e-208.png" />
      <span id="carNAME">Peugeot e-208</span>
      <span id="carAUTONOMY">400km d'autonomie</span>
      <span id="carPOWER">100kw</span>
    </div>
  );
};