import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

import "../css/CarList.css";
import EditIcon from "../assets/edit.svg";

export default function CarList() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="car-list-container">
        <img id="EditIcon" src={EditIcon} />
        <img id="carIMG" height={100} src="https://chargeguru.com/fr/wp-content/uploads/sites/4/2020/03/peugeot-e-208.png" />
        <span id="carNAME">Peugeot e-208</span>
        <span id="carAUTONOMY">400km d'autonomie</span>
        <span id="carPOWER">100kw</span>
      </div>
      <div className="add-car-container">
        <Modal />
      </div>
    </div>
  );
};