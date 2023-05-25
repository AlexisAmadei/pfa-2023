import React, { useEffect } from "react";
import { useState } from "react";

import { db } from "../config/configFirebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import "../css/Card.css";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EngieAppBar from "../components/EngieAppBar";

import CardImage from "../assets/card.png";
import CarBattery from "../assets/CardView/car.svg";
import ChargeIcon from "../assets/CardView/charge.svg";
import MoneyIcon from "../assets/CardView/tirelire.svg";

const userUID = "yiRokmNDgGAc4czw1sIQ";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Card() {
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardNumberHelperText, setCardNumberHelperText] = useState("");
  const [inputCardNumber, setInputCardNumber] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleValidate = async () => {
    if (!cardNumberError) {
      const userRef = doc(db, "users", userUID);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          cardNumber: inputCardNumber
        });
        setCardNumber(inputCardNumber);
      } else console.error("User not found");
      handleClose();
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;

    setInputCardNumber(value);
    if (value.length > 10 || value.length < 10) {
      setCardNumberError(true);
      setCardNumberHelperText("Le numéro doit contenir 10 chiffres");
    } else {
      setCardNumberError(false);
      setCardNumberHelperText("");
    }
  };

  const fetchCardNumber = async () => {
    const userRef = doc(db, "users", userUID);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      if (userSnap.data().cardNumber !== undefined && userSnap.data().cardNumber !== null)
        setCardNumber(userSnap.data().cardNumber);
    } else console.error("User not found");
    return
  };

  useEffect(() => {
    fetchCardNumber();
  }, []);

  return (
    <div style={{ height:'100vh' }}>
      <div className="header-card">
        <img src={CardImage} alt="card" />
      </div>
      <div className="card-explain">
        <h1>Unce carte de recharge ENGIE avec tous les avantages</h1>
        <div className="card-description">
          <p id="item"><img id="img-item" src={CarBattery} alt="icon" />Pratique et économique ! Rechargez votre voiture sur plus de 270 000 borne en France et en Europe.</p>
          <p id="item"><img id="img-item" src={ChargeIcon} alt="icon" />Livraison gratuite, sans abonnement, sans engagement et sans consommation minimale.</p>
          <p id="item"><img id="img-item" src={MoneyIcon} alt="icon" />Profitez de tarifs préférentiels sur les bornes ENGIE !</p>
        </div>
      </div>
      {cardNumber === "" ? (
        <div className="buttons-container">
          <button id="activate-card" onClick={handleOpen}>Activer ma carte</button>
          <button id="order-card"
            onClick={() => window.location.href = "https://mobiliteverte.engie.fr/" }
          >Commander</button>
        </div >
      ) : (
        <div className="display-card-state">
          <p>Votre carte actuelle {cardNumber}</p>
          <Button onClick={handleOpen}>Editer la carte</Button>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
            value={inputCardNumber}
            onChange={handleCardNumberChange}
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              maxLength: 10,
              minLength: 10,
            }}
            error={cardNumberError}
            helperText={cardNumberHelperText}
          />
          <Button onClick={handleValidate}>Valider</Button>
        </Box>
      </Modal>
      <EngieAppBar active='card' />
    </div>
  );
}
