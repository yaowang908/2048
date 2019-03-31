import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import Cookies from 'js-cookie';
import { generator, generatorOne } from '../functions/generator';
import moveHandler from '../functions/move';


//move blocks 
const moveEventHandler = function eventHandler(e, state, dispatch, data, setData) {
    console.log(e);
    if (
        e.code !== 'ArrowDown'
        && e.code !== 'ArrowUp'
        && e.code !== 'ArrowLeft'
        && e.code !== 'ArrowRight'
    ) { return; }
    let [newState, score] = moveHandler(e.code, data, state.isGameOver, state.score, state.BLOCKS_IN_ONE_LINE);

    // setContext({ score: state.score + score});
    dispatch({ type: "updateScore", score: score });
    Cookies.set('score', state.score + score, { path: '' });

    let movementFailure = false;

    let diffBtwStates = differenceWith(newState, data, isEqual)
    if (!diffBtwStates.length) movementFailure = true;

    // if no node are moved, should NOT generator new node
    if (!movementFailure) {
        newState = generatorOne(newState, state.BLOCKS_IN_ONE_LINE);
        if (!!newState) {
            setData(newState);
            Cookies.set('data', newState, { path: '' });
        } else {
            // setContext({isGameOver: true});
            dispatch({ type: "gameOver", isGameOver: true });
            Cookies.set('data', newState, { path: '' });
        }
    } else {
        const maxBlocksNum = state.BLOCKS_IN_ONE_LINE ** 2;
        if (maxBlocksNum === newState.length) {
            // setContext({ isGameOver: true });
            dispatch({ type: "gameOver", isGameOver: true });
            Cookies.set('data', [], { path: '' });
        }
    }
    //if no space to create new node then GAME OVER
}

export { moveEventHandler } 