import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Blocks from '../functions/Blocks';
import moveHandler from '../functions/move';
import { generator, generatorOne } from '../functions/generator';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import Cookies from 'js-cookie';
import { GameContext } from './GameContext';
import { BLOCKS_IN_ONE_LINE } from '../GameConfig';

const BlocksContainer = function groupAllBlocksTogether(props) {
    if (!Cookies.getJSON('data')) Cookies.set('data',[], {path: ''});
    const initState = (Cookies.getJSON('data').length === 0) ? generator([]) : Cookies.getJSON('data');
    const [data, setData] = useState(initState);

    const { context, setContext } = useContext(GameContext);

    function eventHandler(e) {
        let [ newState, score]= moveHandler(e.code, data, context.isGameOver);

        setContext({score: context.score + score});
        Cookies.set('score', context.score + score, { path: '' });

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
                setContext({isGameOver: true});
                Cookies.set('data', newState, { path: '' });
            }
        } else {
            const maxBlocksNum = BLOCKS_IN_ONE_LINE ** 2;
            if (maxBlocksNum === newState.length) {
                setContext({ isGameOver: true });
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