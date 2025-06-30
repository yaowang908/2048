import React, { useReducer, useEffect } from 'react';
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
  let reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'gameOver':
        return { ...state, isGameOver: action.isGameOver };
      case 'updateScore':
        return { ...state, score: action.score };
      case 'restart':
        if (action.gameRestart) {
          Cookies.set('score', '0');
          return {
            ...state,
            isGameOver: false,
            score: 0,
            gameRestart: true,
          };
        } else {
          return { ...state, gameRestart: false };
        }
      case 'setGameLevel':
        return { ...state, BLOCKS_IN_ONE_LINE: action.gameLevel };
      case 'isLevelUpdate':
        return { ...state, isLevelUpdate: action.isLevelUpdate };
      default:
        return state;
    }
  };

  const initContext: State = {
    isGameOver: false,
    score: 0,
    gameRestart: false,
    isLevelUpdate: false,
    BLOCKS_IN_ONE_LINE: BLOCKS_IN_ONE_LINE,
    BG_COLOR,
    BG_BLOCK_COLOR,
    GAME_NAME,
    GAME_DESCRIPTION,
    HEADER_HEIGHT,
    COLOR_SCHEME,
  };

  const [state, dispatch] = useReducer(reducer, initContext);

  useEffect(() => {
    const scoreFromCookie = Cookies.get('score');
    if (scoreFromCookie) {
      dispatch({ type: 'updateScore', score: JSON.parse(scoreFromCookie) });
    }

    const blocksPerLineFromCookie = Cookies.get('BlocksPerLine');
    if (blocksPerLineFromCookie) {
      dispatch({
        type: 'setGameLevel',
        gameLevel: JSON.parse(blocksPerLineFromCookie),
      });
    } else {
      Cookies.set('BlocksPerLine', JSON.stringify(BLOCKS_IN_ONE_LINE), {
        path: '',
      });
    }
  }, []);

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
