import React, { Fragment, useState, useEffect, } from 'react';
import './App.css';

import { GameContext } from './components/GameContext';
import Cookies from 'js-cookie';

import MainContainer from './components/MainContainer';
import Header from './components/Header';

function App() {

  let cachedScore = Cookies.getJSON('score');

  const [gameContext, setGameContext] = useState({
    isGameOver: false,
    score: cachedScore ? cachedScore : 0,
    gameRestart: false,
  });

  //FIXME:update gamecontext.gamerestart
  const [gameRestart, setGameRestart] = useState(false);
  // useEffect( ()=>{
  //   setGameRestart(true);
  // });
  
  return (
    <div className="App">
      <div className="App-header">
        <GameContext.Provider value={{ 
            context: gameContext, 
            setContext: setGameContext, 
            gameRestart: gameRestart, 
            setGameRestart: setGameRestart,
          }}>
          <Header></Header>
          <MainContainer></MainContainer>
        </GameContext.Provider>
      </div>
    </div>
  );
}

export default App;
