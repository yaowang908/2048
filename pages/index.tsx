import React, { useReducer } from 'react';
import { GameContext } from '../components/GameContext';
import Cookies from 'js-cookie';
import MainContainer from '../components/MainContainer';
import Header from '../components/Header';
import {
  BLOCKS_IN_ONE_LINE,
  BG_COLOR,
  BG_BLOCK_COLOR,
  GAME_NAME,
  GAME_DESCRIPTION,
  HEADER_HEIGHT,
  COLOR_SCHEME,
} from '../lib/GameConfig';
import { State, Action } from '../lib/types';

export default function Home() {
  const scoreFromCookie = Cookies.get('score');
  const cachedScore = scoreFromCookie ? JSON.parse(scoreFromCookie) : 0;

  if (!Cookies.get('BlocksPerLine')) {
    Cookies.set('BlocksPerLine', JSON.stringify(BLOCKS_IN_ONE_LINE), {
      path: '',
    });
  }

  let reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'gameOver':
        return { ...state, isGameOver: action.isGameOver };
      case 'updateScore':
        return { ...state, score: action.score };
      case 'restart':
        return { ...state, gameRestart: action.gameRestart };
      case 'setGameLevel':
        return { ...state, BLOCKS_IN_ONE_LINE: action.gameLevel };
      case 'isLevelUpdate':
        return { ...state, isLevelUpdate: action.isLevelUpdate };
      default:
        return state;
    }
  };

  const blocksPerLineFromCookie = Cookies.get('BlocksPerLine');
  const blocksInOneLine = blocksPerLineFromCookie
    ? JSON.parse(blocksPerLineFromCookie)
    : BLOCKS_IN_ONE_LINE;

  const initContext: State = {
    isGameOver: false,
    score: cachedScore ? cachedScore : 0,
    gameRestart: false,
    isLevelUpdate: false,
    BLOCKS_IN_ONE_LINE: blocksInOneLine,
    BG_COLOR,
    BG_BLOCK_COLOR,
    GAME_NAME,
    GAME_DESCRIPTION,
    HEADER_HEIGHT,
    COLOR_SCHEME,
  };

  const [state, dispatch] = useReducer(reducer, initContext);

  return (
    <div className='App'>
      <div className='App-header'>
        <GameContext.Provider value={{ state, dispatch }}>
          <Header />
          <MainContainer />
        </GameContext.Provider>
      </div>
    </div>
  );
}
