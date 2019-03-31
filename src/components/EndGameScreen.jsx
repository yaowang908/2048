import React, { useContext } from 'react';
import { GameContext } from './GameContext';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';

const EndGame = function endGameScreen( props ) {
    // const { context, } = useContext(GameContext);
    const {state, dispatch} = useContext(GameContext);

    function restartGame() {
        dispatch({ type: 'restart', gameRestart: true });
        Cookies.set('score', 0, { path: '/' });
    }

    return (
        <div style={{
            'width': props.width,
            'height': props.height,
            'fontSize': '4rem',
            'backgroundColor': 'rgba(16,17,20,0.8)',
            'textAlign': 'center',
            'lineHeight': props.height,
            'position': 'absolute',
            'display': state.isGameOver ? 'block' : 'none',
            'zIndex': '1000',
        }}>
            <span>GAME    </span>
            <Button variant="contained" color="secondary" size="medium" onClick={restartGame}>RESTART</Button>
            <span>    OVER</span>
        </div>
    );
}

EndGame.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
}

export default EndGame;