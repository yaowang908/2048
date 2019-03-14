import React, { useContext } from 'react';
import { GameContext } from './GameContext';
import PropTypes from 'prop-types';

const EndGame = function endGameScreen( props ) {
    const { context, } = useContext(GameContext);

    return (
        <div style={{
            'width': props.width,
            'height': props.height,
            'fontSize': '4rem',
            'backgroundColor': 'rgba(16,17,20,0.8)',
            'textAlign': 'center',
            'lineHeight': props.height,
            'position': 'absolute',
            'display': context.isGameOver ? 'block' : 'none',
            'zIndex': '1000',
        }}>
            GAME OVER
        </div>
    );
}

EndGame.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
}

export default EndGame;