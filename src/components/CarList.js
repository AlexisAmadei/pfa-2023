import React, { useState, useEffect } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/configFirebase";

import Modal from "../components/Modal";
import EditIcon from "../assets/edit.svg";
import "../css/CarList.css";

const userUID = "yiRokmNDgGAc4czw1sIQ";

export default function CarList() {
  const [carPerso, setCarPerso] = useState("");
  const [carPersoImg, setCarPersoImg] = useState("");
  const [carPersoPower, setCarPersoPower] = useState("");
  const [carPersoAuto, setCarPersoAuto] = useState("");

  const [carPro, setCarPro] = useState("");
  const [carProImg, setCarProImg] = useState("");
  const [carProPower, setCarProPower] = useState("");
  const [carProAuto, setCarProAuto] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      const docRef = doc(db, "users", userUID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCarPerso(docSnap.data().carPerso.name);
        setCarPro(docSnap.data().carPro.name);
      } else console.error("No such document!");
    };
    getProfileData();
  }, []);

  useEffect(() => {
    const fetchCarData = async () => {
      if (carPerso) {
        const carPersoRef = doc(db, "cars", carPerso);
        const carPersoSnap = await getDoc(carPersoRef);
        if (carPersoSnap.exists()) {
          setCarPersoImg(carPersoSnap.data().img);
          setCarPersoPower(carPersoSnap.data().power);
          setCarPersoAuto(carPersoSnap.data().autonomy);
        } else console.error("No carPerso document!");
      }
      if (carPro) {
        const carProRef = doc(db, "cars", carPro);
        const carProSnap = await getDoc(carProRef);
        if (carProSnap.exists()) {
          setCarProPower(carProSnap.data().power);
          setCarProAuto(carProSnap.data().autonomy);
          setCarProImg(carProSnap.data().img);
        } else console.error("No carPro document!");
      }
    };
    fetchCarData();
  }, [carPerso, carPro]);

  return (
    <div>
      <div className="card-selection-container">
        <div className="car-selection-card">
          {carPerso && (
            <div className="car-item">
              <img id="EditIcon" src={EditIcon} alt="icon" />
              <img id="carIMG" height={20} src={carPersoImg} alt="car image" />
              <span id="carNAME">{carPerso}</span>
              <span id="carAUTONOMY">{carPersoAuto}km</span>
              <span id="carPOWER">{carPersoPower}kw</span>
              <span id="car-label">Perso</span>
            </div>
          )}
        </div>
        <div className="car-selection-card">
          {carPro && (
            <div className="car-item">
              <img id="EditIcon" src={EditIcon} alt="icon" />
              <img id="carIMG" height={20} src={carProImg} alt="car image" />
              <span id="carNAME">{carPro}</span>
              <span id="carAUTONOMY">{carProAuto}km</span>
              <span id="carPOWER">{carProPower}kw</span>
              <span id="car-label">Pro</span>
            </div>
          )}
        </div>
      </div >
      <div className="add-car-container">
        <Modal />
      </div>
    </div>
  );
};
