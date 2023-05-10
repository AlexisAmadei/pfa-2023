import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { db } from "../config/configFirebase"
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

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

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedCarType, setSelectedCarType] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleValidate = async () => {
    const userRef = doc(db, "users", userUID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      if (selectedCarType === "1") {
        await updateDoc(userRef, {
          carPerso: selectedCar
        });
      } else if (selectedCarType === "2") {
        await updateDoc(userRef, {
          carPro: selectedCar
        });
      }
    } else console.error("User not found");
    handleClose();
  }

  useEffect(() => {
    const getCarsData = async () => {
      const carsRef = collection(db, "cars");
      const snap = await getDocs(carsRef);
      const carsData = snap.docs.map(doc => ({ id: doc.id, data: doc.data() }));
      setCars(carsData);
    }
    getCarsData();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>Ajouter une voiture</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Selectionnez votre modèle
          </Typography>
          <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
            <option value="">-- Selectionnez une voiture --</option>
            {cars.map(car => (
              <option key={car.id} value={car.id}>
                {car.id}
              </option>
            ))}
          </select>
          <select value={selectedCarType} onChange={(e) => setSelectedCarType(e.target.value)}>
            <option value="">-- Selectionnez le type --</option>
            <option value="1">Perso</option>
            <option value="2">Pro</option>
          </select>
          <Button onClick={handleValidate}>Valider</Button>
        </Box>
      </Modal>
    </div>
  );
}
