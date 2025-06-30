import React, { useContext } from 'react';
import { GameContext } from './GameContext';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';

interface MenusProps {
    width: string;
}

const Menus: React.FC<MenusProps> = ({ width }) => {
    const { state, dispatch } = useContext(GameContext);

    if (!state || !dispatch) {
        return null;
    }

    function restartGame() {
        dispatch({ type: 'restart', gameRestart: true });
        Cookies.set('score', JSON.stringify(0), { path: '' });
    }

    // TODO: This component should be refactored to use React state instead of direct DOM manipulation.
    function setGameLevel() {
        const gameLevelBtn = document.getElementById('game-level-btn');
        if (gameLevelBtn?.firstChild) {
            (gameLevelBtn.firstChild as HTMLElement).textContent = '';
            (gameLevelBtn.firstChild as HTMLElement).style.width = '103px';
        }

        const gameLevels = document.getElementById('game-levels');
        if (gameLevels) {
            gameLevels.style.cssText = 'display: block';

            gameLevels.addEventListener('wheel', (e) => {
                let currentTop = gameLevels.style.top;
                gameLevels.style.cssText = `top: ${scrollToGameLevel(
                    currentTop,
                    e.deltaY
                )}px; display: block`;
            });
        }

        function scrollToGameLevel(top: string, upOrDown: number) {
            const currentTop = Number(top.split('px')[0]);
            if (upOrDown > 0) {
                //goUP
                if (currentTop >= -48) {
                    return currentTop - 48;
                }
                return currentTop;
            } else if (upOrDown < 0) {
                //goDown
                if (currentTop <= -48) {
                    return currentTop + 48;
                }
                return currentTop;
            }
            return currentTop;
        }
    }

    function apllyGameLevel(level: number) {
        return () => {
            const gameLevelBtn = document.getElementById('game-level-btn');
            if (gameLevelBtn?.firstChild) {
                (gameLevelBtn.firstChild as HTMLElement).textContent = 'GAME LEVEL';
                (gameLevelBtn.firstChild as HTMLElement).style.width = 'auto';
            }
            const gameLevels = document.getElementById('game-levels');
            if (gameLevels) {
                gameLevels.style.cssText = 'display: none';
            }

            dispatch({ type: 'restart', gameRestart: true });
            Cookies.set('score', JSON.stringify(0), { path: '' });
            dispatch({ type: 'setGameLevel', gameLevel: level });
            dispatch({ type: 'isLevelUpdate', isLevelUpdate: true });
        };
    }

    return (
        <div style={{ width: width }} className="relative mt-[50px] h-[50px] flex justify-between">
            <ul id="game-levels" className="absolute top-0 w-[135px] p-0 m-0 list-none text-center z-[100] hidden transition-all duration-500 ease-in-out">
                <li onClick={apllyGameLevel(4)} className="text-base font-bold p-[10px] border-b border-gray-100 cursor-pointer">4x4</li>
                <li onClick={apllyGameLevel(5)} className="text-base font-bold p-[10px] border-b border-gray-100 cursor-pointer">5x5</li>
                <li onClick={apllyGameLevel(10)} className="text-base font-bold p-[10px] border-b border-gray-100 cursor-pointer">10x10</li>
            </ul>
            <Button
                variant="contained"
                color="secondary"
                size="medium"
                id="game-level-btn"
                onClick={setGameLevel}
            >
                GAME LEVEL
            </Button>
            <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={restartGame}
            >
                RESTART
            </Button>
        </div>
    );
};

export default Menus;