import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Blocks from '../functions/Blocks';
import { generator, generatorOne } from '../functions/generator';
import Cookies from 'js-cookie';
import { moveEventHandler } from '../functions/moveEventHandler';
import { GameContext } from './GameContext';

const BlocksContainer = function groupAllBlocksTogether(props) {
    // const { BLOCKS_IN_ONE_LINE } = useContext(GameContext);
    // const { context, setContext } = useContext(GameContext);
    // const { gameRestart, setGameRestart } = useContext(GameContext);
    const { state, dispatch } = useContext(GameContext);

    if (!Cookies.getJSON('data')) Cookies.set('data',[], {path: ''});
    const initState = ((Cookies.getJSON('data') && Cookies.getJSON('data').length === 0)) ? generator([], state.BLOCKS_IN_ONE_LINE) : Cookies.getJSON('data');
    
    const [data, setData] = useState(initState);
    

    if (state.gameRestart) {
        Cookies.set('data', [], {path:'/'});
        Cookies.set('BlocksPerLine', state.BLOCKS_IN_ONE_LINE, { path: '/' });
        window.location.reload(false);
    };

    function eventHandlerMiddleLayer(e) {
        return moveEventHandler(e, state, dispatch, data, setData);
    }
    
    //add keyboard listener
    useEffect(() => {
        if (state.isLevelUpdate) {
            setData(generator([], state.BLOCKS_IN_ONE_LINE));
            dispatch({type:'isLevelUpdate',isLevelUpdate:false});
        }
        window.addEventListener('keydown', eventHandlerMiddleLayer);
        return () => {
            window.removeEventListener('keydown', eventHandlerMiddleLayer)
        };
    });

    useEffect( ()=>{
        setData(props.data);
    },[props.data]);

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
    data: PropTypes.array,//update when swipe
};

export default BlocksContainer;