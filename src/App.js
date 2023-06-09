import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "firebase/firestore";

import Landing from './views/Landing';
import Itinerary from './views/Itinerary';
import Charge from './views/Charge';
import Card from './views/Card';
import Account from './views/Account';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="overlay">
        <p>Application visible au format d'écran mobile uniquement.</p>
      </div>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/itinerary' element={<Itinerary />} />
          <Route path='/charge' element={<Charge />} />
          <Route path='/card' element={<Card />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
