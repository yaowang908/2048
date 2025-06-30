import React, { useContext } from 'react';
import { GameContext } from './GameContext';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';

interface EndGameProps {
    width: string;
    height: string;
}

const EndGame: React.FC<EndGameProps> = ({ width, height }) => {
    const { state, dispatch } = useContext(GameContext);

    if (!state || !dispatch) {
        return null;
    }

    function restartGame() {
        dispatch({ type: 'restart', gameRestart: true });
        Cookies.set('score', JSON.stringify(0), { path: '' });
    }

    return (
        <div
            style={{
                width: width,
                height: height,
                fontSize: '4rem',
                backgroundColor: 'rgba(16,17,20,0.8)',
                textAlign: 'center',
                lineHeight: height,
                position: 'absolute',
                display: state.isGameOver ? 'block' : 'none',
                zIndex: 1000,
            }}
        >
            <span>GAME </span>
            <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={restartGame}
            >
                RESTART
            </Button>
            <span> OVER</span>
        </div>
    );
};

export default EndGame;