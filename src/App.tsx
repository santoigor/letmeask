import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './_contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>

      <Route exact path='/' component={ Home }/>
      <Route  path='/rooms/new' component={ NewRoom }/>
    </AuthContextProvider>
    </BrowserRouter>
   
  );
}

export default App;
