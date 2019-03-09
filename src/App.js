import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import MainContainer from './components/MainContainer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header></Header>
        <MainContainer></MainContainer>
      </div>
    </div>
  );
}

export default App;
