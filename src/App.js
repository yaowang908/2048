import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import MainContainer from './components/MainContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainContainer></MainContainer>
      </header>
    </div>
  );
}

export default App;
