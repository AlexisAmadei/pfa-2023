import React, { useEffect } from "react";
import { useState } from "react";

import { db } from "../config/configFirebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
      setCardNumber(userSnap.data().cardNumber);
    } else console.error("User not found");
    return
  };

  useEffect(() => {
    fetchCardNumber();
  }, []);

  return (
    <div>
      {cardNumber === "" ? (
        <>
          <p>Vous n'avez pas encore de carte RFID</p>
          <Button onClick={handleOpen}>Ajouter une carte RFID</Button>
        </>
      ) : (
        <>
          <p>Vous avez déjà une carte RFID</p>
          <Button onClick={handleOpen}>Editer la carte</Button>
        </>
      )}
      <div>
        <p>Current card number: {cardNumber}</p>
      </div>
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
    </div>
  );
}
