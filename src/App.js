import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Landing from './views/Landing';
import Itinerary from './views/Itinerary';
import Charge from './views/Charge';
import Card from './views/Card';
import Account from './views/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route to />
        <Route path='/' element={ <Landing />} />
        <Route path='/itinerary' element={ <Itinerary /> } />
        <Route path='/charge' element={ <Charge /> } />
        <Route path='/card' element={ <Card /> } />
        <Route path='/account' element={ <Account /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
