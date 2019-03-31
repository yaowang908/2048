import React, { Fragment, useState, useEffect, useReducer} from 'react';
import './App.css';
import { GameContext } from './components/GameContext';
import Cookies from 'js-cookie';
import MainContainer from './components/MainContainer';
import Header from './components/Header';
import {
  BLOCKS_IN_ONE_LINE,
  BG_COLOR,
  BG_BLOCK_COLOR,
  GAME_NAME,
  GAME_DESCRIPTION,
  HEADER_HEIGHT,
  COLOR_SCHEME,
} from './GameConfig';

function App() {

  let cachedScore = Cookies.getJSON('score');

  if (!Cookies.getJSON('BlocksPerLine')) {
    Cookies.set('BlocksPerLine', BLOCKS_IN_ONE_LINE, {path:'/'});
  }

  let reducer = (state, action) => {
    switch(action.type) {
      case "gameOver":
        return {...state, isGameOver: action.isGameOver};
      case "updateScore":
        return {...state, score: action.score};
      case "restart":
        return {...state, gameRestart: action.gameRestart};
      case "setGameLevel":
        return { ...state, BLOCKS_IN_ONE_LINE: action.gameLevel};
      default:
        return;
    }
  }

  // const [gameContext, setGameContext] = useState({
  //   isGameOver: false,
  //   score: cachedScore ? cachedScore : 0,
  //   gameRestart: false,
  // });

  const initContext = {
    isGameOver: false,
    score: cachedScore ? cachedScore : 0,
    gameRestart: false,
    BLOCKS_IN_ONE_LINE,
    BG_COLOR,
    BG_BLOCK_COLOR,
    GAME_NAME,
    GAME_DESCRIPTION,
    HEADER_HEIGHT,
    COLOR_SCHEME,
  }

  //FIXME:update gamecontext.gamerestart
  // const [gameRestart, setGameRestart] = useState(false);
  // useEffect( ()=>{
  //   setGameRestart(true);
  // });

  const [state, dispatch] = useReducer(reducer, initContext);
  
  return (
    <div className="App">
      <div className="App-header">
        <GameContext.Provider value={{state, dispatch}}>
          <Header></Header>
          <MainContainer></MainContainer>
        </GameContext.Provider>
      </div>
    </div>
  );
}

export default App;
