import React, { useEffect } from "react";
import { useState } from "react";

import { db } from "../config/configFirebase";
import { doc, getDoc } from "firebase/firestore";

import EngieAppBar from "../components/EngieAppBar";
import CarList from "../components/CarList";

const userUID = "yiRokmNDgGAc4czw1sIQ";

export default function Account() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [car, setCar] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, "users", userUID);
      const userSnap = await getDoc(userRef);
      if(userSnap.exists()) {
        setFirstName(userSnap.data().firstName);
        setLastName(userSnap.data().lastName);
        setCar(userSnap.data().car);
      } else console.error("No such document!");
    };
    getUserData();
  }, [
    firstName,
    lastName,
  ]);

  return (
    <div className="main-account-container">
      <div className="preview">
        <div className="profile-picture">
          <img height={70} src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="profile-info">
          <span id="profile-text">{firstName} {lastName}</span>
        </div>
      </div>
      <div className="cars-list">
        <span id="profile-text">{car}</span>
        <CarList />
      </div>
      <div className="menu-list">
        <ul>
          <li>Informations personnelles</li>
          <li>Itinéraire enregistrés</li>
          <li>Charges enregistrées</li>
          <li>Historique des paiements</li>
          <li>Confidentialité et sécurité</li>
        </ul>
      </div>
      <EngieAppBar active='account' />
    </div>
  );
}