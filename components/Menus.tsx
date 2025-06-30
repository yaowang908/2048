import React, { useContext, useState } from 'react';
import { GameContext } from './GameContext';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';

interface MenusProps {
    width: string;
}

const Menus: React.FC<MenusProps> = ({ width }) => {
    const { state, dispatch } = useContext(GameContext);
    const [isLevelMenuOpen, setIsLevelMenuOpen] = useState(false);

    if (!state || !dispatch) {
        return null;
    }

    function restartGame() {
        dispatch({ type: 'restart', gameRestart: true });
        Cookies.set('score', JSON.stringify(0), { path: '' });
    }

    const toggleLevelMenu = () => {
        setIsLevelMenuOpen(!isLevelMenuOpen);
    };

    const applyGameLevel = (level: number) => {
        return () => {
            dispatch({ type: 'restart', gameRestart: true });
            Cookies.set('score', JSON.stringify(0), { path: '' });
            dispatch({ type: 'setGameLevel', gameLevel: level });
            dispatch({ type: 'isLevelUpdate', isLevelUpdate: true });
            setIsLevelMenuOpen(false);
        };
    };

    return (
        <div style={{ width: width }} className="mt-[50px] h-[50px] flex justify-between">
            <div className="relative">
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={toggleLevelMenu}
                >
                    GAME LEVEL
                </Button>
                {isLevelMenuOpen && (
                    <ul className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg z-10 list-none p-0 m-0 text-center">
                        <li onClick={applyGameLevel(4)} className="text-base font-bold p-[10px] border-b border-gray-100 cursor-pointer hover:bg-gray-200 rounded-t-md">4x4</li>
                        <li onClick={applyGameLevel(5)} className="text-base font-bold p-[10px] border-b border-gray-100 cursor-pointer hover:bg-gray-200">5x5</li>
                        <li onClick={applyGameLevel(10)} className="text-base font-bold p-[10px] cursor-pointer hover:bg-gray-200 rounded-b-md">10x10</li>
                    </ul>
                )}
            </div>
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