import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import Cookies from 'js-cookie';
import { generator, generatorOne } from './generator';
import moveHandler from './move';
import { State, Action, BlockData } from '../types';
import { Dispatch, SetStateAction } from 'react';

//move blocks
const moveEventHandler = function eventHandler(
  e: { code: string },
  state: State,
  dispatch: Dispatch<Action>,
  data: BlockData[],
  setData: Dispatch<SetStateAction<BlockData[]>>
) {
  console.log(e);
  if (
    e.code !== 'ArrowDown' &&
    e.code !== 'ArrowUp' &&
    e.code !== 'ArrowLeft' &&
    e.code !== 'ArrowRight'
  ) {
    return;
  }
  if (state.isGameOver) return;
  let [newState, score] = moveHandler(
    e.code,
    data,
    state.isGameOver,
    state.score,
    state.BLOCKS_IN_ONE_LINE
  );

  // setContext({ score: state.score + score});
  dispatch({ type: 'updateScore', score: score });
  Cookies.set('score', JSON.stringify(state.score + score), { path: '' });

  let movementFailure = false;

  let diffBtwStates = differenceWith(newState, data, isEqual);
  if (!diffBtwStates.length) movementFailure = true;

  // if no node are moved, should NOT generator new node
  if (!movementFailure) {
    const newStateAfterGeneration = generatorOne(
      newState,
      state.BLOCKS_IN_ONE_LINE
    );
    if (newStateAfterGeneration) {
      setData(newStateAfterGeneration);
      Cookies.set('data', JSON.stringify(newStateAfterGeneration), {
        path: '',
      });
    } else {
      // setContext({isGameOver: true});
      dispatch({ type: 'gameOver', isGameOver: true });
      Cookies.set('data', JSON.stringify(newState), { path: '' });
    }
  } else {
    const maxBlocksNum = state.BLOCKS_IN_ONE_LINE ** 2;

    if (maxBlocksNum === newState.length && shouldGameEnd(data, state)) {
      // setContext({ isGameOver: true });
      dispatch({ type: 'gameOver', isGameOver: true });
      Cookies.set('data', JSON.stringify([]), { path: '' });
      Cookies.set('score', JSON.stringify(0), { path: '' });
    }
  }
  //if no space to create new node then GAME OVER
};

//check possible step
const shouldGameEnd = function tryFourDirectionFindPossibleStep(data, state) {
  let [newStateUp, scoreUp] = moveHandler(
    'ArrowUp',
    data,
    state.isGameOver,
    state.score,
    state.BLOCKS_IN_ONE_LINE
  );
  let [newStateDown, scoreDown] = moveHandler(
    'ArrowDown',
    data,
    state.isGameOver,
    state.score,
    state.BLOCKS_IN_ONE_LINE
  );
  let [newStateLeft, scoreLeft] = moveHandler(
    'ArrowLeft',
    data,
    state.isGameOver,
    state.score,
    state.BLOCKS_IN_ONE_LINE
  );
  let [newStateRight, scoreRight] = moveHandler(
    'ArrowRight',
    data,
    state.isGameOver,
    state.score,
    state.BLOCKS_IN_ONE_LINE
  );

  let diffBtwStatesUp = differenceWith(newStateUp, data, isEqual);
  let diffBtwStatesDown = differenceWith(newStateDown, data, isEqual);
  let diffBtwStatesLeft = differenceWith(newStateLeft, data, isEqual);
  let diffBtwStatesRight = differenceWith(newStateRight, data, isEqual);

  if (
    !diffBtwStatesUp.length &&
    !diffBtwStatesDown.length &&
    !diffBtwStatesLeft.length &&
    !diffBtwStatesRight.length
  ) {
    return true;
  }

  return false;
};

export { moveEventHandler };
