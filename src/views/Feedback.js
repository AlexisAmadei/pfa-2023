import React, { useState } from "react";

import EngieAppBar from "../components/EngieAppBar";
import ViewHeader from "../components/ViewHeader";
import "../css/Feedback.css"

import { db } from "../config/configFirebase";
import { addDoc, collection } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const items = [
    'Etat de la borne',
    'Lancement de la charge',
    'Récapitulatif',
    'Environnement extérieur',
    'Suivi des charges',
    'Paiement',
    'Autres'
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (selectedItems.includes(item))
      setSelectedItems(selectedItems.filter(i => i !== item));
    else setSelectedItems([...selectedItems, item]);
  };

  const handleNumberClick = (number) => setSelectedNumber(number);

  const handleSubmit = async () => {
    await addDoc(collection(db, "feedback"), {
      borneID: localStorage.getItem('borneID'),
      grade: selectedNumber,
      report: selectedItems,
      comment: document.getElementById('feedback-comment').value,
    });
    navigate('/');
  };

  return (
    <div className="feedback-view">
      <ViewHeader
        highlight="Donnez-nous"
        text="votre avis"
      />
      <div className="feedback-container">
        <p>Comment décririez-vous votre expérience de recharge ?</p>
        <div className="feedback-numbers">
          {[...Array(5)].map((_, i) => (
            <div key={i + 1} className="number-item" style={{ backgroundColor: selectedNumber === i + 1 ? '#007ACD' : 'white' }}>
              <p onClick={() => handleNumberClick(i + 1)} style={{ color: selectedNumber === i + 1 ? 'white' : 'initial' }}>
                {i + 1}
              </p>
            </div>
          ))}
        </div>
        <p>Avez-vous des signalements</p>
        <div className="feedback-exemples">
          {items.map(item => (
            <p
              id="item"
              key={item}
              onClick={() => handleItemClick(item)}
              style={{
                backgroundColor: selectedItems.includes(item) ? '#007ACD' : 'initial',
                color: selectedItems.includes(item) ? 'white' : '#007ACD'
              }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      {selectedItems.length > 0 && (
        <div className="comment-container">
          <textarea id="feedback-comment" placeholder="Décrivez le(s) problème(s) rencontré(s) en quelques lignes..." />
          <button id="button-active" onClick={() => handleSubmit()}>Continuer</button>
        </div>
      )}
      {selectedItems.length === 0 && (
          <button id="button-inactive">Continuer</button>
      )}
      <EngieAppBar active="charge" />
    </div>
  );
}
