import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Blocks from '../functions/Blocks';
import moveHandler from '../functions/move';
import { generator, generatorOne } from '../functions/generator';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import Cookies from 'js-cookie';
import { GameContext } from './GameContext';

const BlocksContainer = function groupAllBlocksTogether(props) {
    // const { BLOCKS_IN_ONE_LINE } = useContext(GameContext);
    // const { context, setContext } = useContext(GameContext);
    // const { gameRestart, setGameRestart } = useContext(GameContext);
    const { state, dispatch } = useContext(GameContext);

    if (!Cookies.getJSON('data')) Cookies.set('data',[], {path: ''});
    const initState = ((Cookies.getJSON('data') && Cookies.getJSON('data').length === 0)) ? generator([]) : Cookies.getJSON('data');
    const [data, setData] = useState(initState);
    

    if (state.gameRestart) {
        Cookies.set('data', [], {path:'/'});
        window.location.reload(false);
    };

    //move blocks 
    function eventHandler(e) {
        console.log(e.code);
        if (
            e.code !== 'ArrowDown' 
            && e.code !== 'ArrowUp'
            && e.code !== 'ArrowLeft'
            && e.code !== 'ArrowRight'
            ) { return; }
        let [newState, score] = moveHandler(e.code, data, state.isGameOver);

        // setContext({ score: state.score + score});
        dispatch({ type: "updateScore", score: state.score + score});
        Cookies.set('score', state.score + score, { path: '' });

        let movementFailure = false;

        let diffBtwStates = differenceWith(newState, data, isEqual)
        if (!diffBtwStates.length) movementFailure = true;
        
        // if no node are moved, should NOT generator new node
        if(!movementFailure) {
            newState = generatorOne(newState);
            if (!!newState) {
                setData(newState);
                Cookies.set('data',newState, { path: ''});
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

    //add keyboard listener
    useEffect(() => {
        window.addEventListener('keydown', eventHandler);
        return () => {
            window.removeEventListener('keydown', eventHandler)
        };
    });

    return (
        <div style={{ 'position': 'absolute' }}>
            <Blocks
                data={data}
                blockWidth={props.blockWidth}
            ></Blocks>
        </div>
    );
}

BlocksContainer.defaultProps = {
    blockWidth: 120,
}

BlocksContainer.propTypes = {
    blockWidth : PropTypes.number.isRequired,
};

export default BlocksContainer;