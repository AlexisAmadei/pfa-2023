import React, { useEffect } from "react";
import { useState } from "react";

import { db } from "../config/configFirebase";
import { doc, getDoc } from "firebase/firestore";

import EngieAppBar from "../components/EngieAppBar";
import CarList from "../components/CarList";
import "../css/Account.css"

import AccountIcon from "../assets/EngieAppBar/active/account.svg";
import ItineraryMap from "../assets/EngieAppBar/active/map.svg";
import Money from "../assets/tirelire.svg"
import Lock from "../assets/locker.svg"

const userUID = "yiRokmNDgGAc4czw1sIQ";

export default function Account() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, "users", userUID);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setFirstName(userSnap.data().firstName);
        setLastName(userSnap.data().lastName);
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
        <CarList />
      </div>
      <div className="menu-list">
        <ul>
          <li id="account-menu-item"><img src={AccountIcon} />Informations personnelles</li>
          <li id="account-menu-item"><img src={ItineraryMap} />Itinéraire enregistrés</li>
          <li id="account-menu-item"><img src={Money} />Historique des paiements</li>
          <li id="account-menu-item"><img src={Lock} />Confidentialité et sécurité</li>
        </ul>
      </div>
      <EngieAppBar active='account' />
    </div>
  );
}