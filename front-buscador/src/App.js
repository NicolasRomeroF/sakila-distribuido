import React from 'react';
import Buscador from './Buscador/Buscador';
import Resultados from './Resultados/Resultados';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Buscador} />
        <Route path="/search/:cadena" exact component={Resultados} />
      </Switch>
      
    </Router>
  );
}

export default App;
