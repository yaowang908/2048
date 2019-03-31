import React, { useState, useEffect,useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GameContext } from './GameContext';
import Cookies from 'js-cookie';

import Button from '@material-ui/core/Button';

const MenuContainer = styled.div`
    margin-top: 50px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    position: relative;
`;

const GameLevelContainer = styled.ul`
    width: 135px;
    top: 0;
    padding: 0;
    margin: 0;
    margin-top: 0;
    position: absolute;
    list-style: none;
    text-align: center;
    z-index: 100;
    display: none;
    transition: all 0.5s ease-in-out;
`;

const GameLevelItem = styled.li`
    font-size: 1rem;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;
    cursor: pointer;
`;

const Menus = function CreateBottomMenu(props) {
    const [width, setWidth] = useState('400px');

    useEffect( () => {
        setWidth(props.width);
    }, [props.width] );

    // const { gameRestart, setGameRestart  } = useContext(GameContext);
    const { state, dispatch } = useContext(GameContext);
    const [ isOpen, setIsOpen ] = useState(false);

    function restartGame() {
        dispatch({type:'restart', gameRestart: true});
        Cookies.set('score',0, {path:'/'});
    }

    function setGameLevel() { 
        const gameLevelBtn = document.getElementById('game-level-btn');
        gameLevelBtn.firstChild.textContent = "";
        gameLevelBtn.firstChild.style.width= "103px";

        const gameLevels = document.getElementById('game-levels');
        gameLevels.style.cssText = 'display: block';

        gameLevels.addEventListener('wheel',(e)=>{
            let currentTop = gameLevels.style.top;
            gameLevels.style.cssText = `top: ${scrollToGameLevel(currentTop, e.deltaY)}px; display: block`;
        });

        function scrollToGameLevel(top, upOrDown) {
            const currentTop = Number(top.split('px')[0]); 
            if (upOrDown>0) {
                //goUP
                if (currentTop >= -48) {
                    return currentTop - 48;
                }
                return currentTop;
            } else if (upOrDown<0) {
                //goDown
                if (currentTop <= -48) {
                    return currentTop + 48;
                }
                return currentTop;
            }
        }
    }

    function apllyGameLevel(level) {
        
        return (e)=>{
            const gameLevelBtn = document.getElementById('game-level-btn');
            gameLevelBtn.firstChild.textContent = "GAME LEVEL";
            gameLevelBtn.firstChild.style.width = "auto";
            const gameLevels = document.getElementById('game-levels');
            gameLevels.style.cssText = 'display: none';

            dispatch({ type: 'restart', gameRestart: true });
            dispatch({ type: 'setGameLevel', gameLevel: level});
            dispatch({ type: 'isLevelUpdate', isLevelUpdate: true});
        };
    }

    return(
        <MenuContainer style={{ 'width':width }}>
            <GameLevelContainer id="game-levels">
                <GameLevelItem onClick={apllyGameLevel(4)}>4x4</GameLevelItem>
                <GameLevelItem onClick={apllyGameLevel(5)}>5x5</GameLevelItem>
                <GameLevelItem onClick={apllyGameLevel(10)}>10x10</GameLevelItem>
            </GameLevelContainer>
            <Button variant="contained" color="secondary" size="medium" id='game-level-btn' onClick={setGameLevel}>GAME LEVEL</Button>
            <Button variant="contained" color="secondary" size="medium" onClick={restartGame}>RESTART</Button>
        </MenuContainer>      
    );
}

Menus.propTypes = {
    width: PropTypes.string.isRequired,
}

export default Menus;