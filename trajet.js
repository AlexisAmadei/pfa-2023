
//fait avec un peut de chat GPT pour faire la barre de recherche et connecter a une base de donner


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs } from "firebase/firestore";

// configuration firebbase
const firebaseConfig = {
    apiKey: "AIzaSyCD_6R6vtnfuokVEttrozoFY2jqnscYdFs",
    authDomain: "pfa-engie-51e7f.firebaseapp.com",
    projectId: "pfa-engie-51e7f",
    storageBucket: "pfa-engie-51e7f.appspot.com",
    messagingSenderId: "345072114546",
    appId: "1:345072114546:web:59dd885025fe0b5dd51beb",
    measurementId: "G-NKGDHB0DH1"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('results');
const departureInput = document.getElementById('departureInput');
const destinationInput = document.getElementById('destinationInput');

// Référence à la collection Firestore  interroger
const firestore = firebase.firestore();
const collectionRef = firestore.collection('votre_collection');

searchInput.addEventListener('input', function() {
  const searchTerm = searchInput.value.toLowerCase();

  resultsList.innerHTML = '';

  // Interroger la base de données Firestore
  collectionRef.where('champRecherche', '>=', searchTerm)
    .where('champRecherche', '<=', searchTerm + '\uf8ff')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const item = doc.data().champAffichage;
        const li = document.createElement('li');
        li.textContent = item;
        resultsList.appendChild(li);
      });
    })
    .catch(error => {
      console.log('Erreur lors de la recherche :', error);
    });
});
// Récupérer les documents de la collection "users"
const querySnapshot = await getDocs(collection(db, "users"));

// Parcourir les documents
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

// Utilisez les valeurs des barres de recherche pour effectuer des opérations supplémentaires
const departure = departureInput.value;
const destination = destinationInput.value;

// Vous pouvez maintenant utiliser les valeurs de départ et de destination dans vos requêtes Firestore ou d'autres opérations nécessaires.

// Récupérer la charge de depart et d'arriver 
const inputChargeDepart = document.getElementById('chargeDepart');
const spanChargeDepartValue = document.getElementById('chargeDepartValue');

const inputEnergieArrivee = document.getElementById('energieArrivee');
const spanEnergieArriveeValue = document.getElementById('energieArriveeValue');

// Ajouter des écouteurs d'événement aux éléments input
inputChargeDepart.addEventListener('input', () => {
  spanChargeDepartValue.textContent = `${inputChargeDepart.value}%`;
});

inputEnergieArrivee.addEventListener('input', () => {
  spanEnergieArriveeValue.textContent = `${inputEnergieArrivee.value}%`;
});

// chois du nombre de pose 
const inputPoses = document.getElementById('nombrePoses');
const spanPosesValue = document.getElementById('nombrePosesValue');

// Définir la valeur initiale
spanPosesValue.textContent = `${inputPoses.value} poses`;

// Ajouter un écouteur d'événement à l'élément input
inputPoses.addEventListener('input', () => {
  spanPosesValue.textContent = `${inputPoses.value} poses`;
});

