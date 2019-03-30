import React, {  Fragment, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// import { BLOCKS_IN_ONE_LINE, BG_COLOR, } from '../GameConfig';
import Menus from './Menus';
import BlocksContainer from './BlocksContainer';
import Grid from './Grid';
import EndGame from './EndGameScreen';
import { GameContext } from './GameContext';

const Container = styled.div`
    width: 100%;
    display: flex;
`;

const Main = styled.div`
    flex-grow: 2;
    flex-shrink: 1;
    flex-basis: 0;
    min-width: 400px;
    max-width: 600px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: content-box;
    position: relative;
`;

const SideHolder = styled.div`
    flex-grow: 1;
    display: flex;
`;

const MainContainer = function MainPlayGround() {
    // const { BLOCKS_IN_ONE_LINE, BG_COLOR } = useContext(GameContext);
    const {state, dispatch} = useContext(GameContext);

    const minWidth = 400;
    const [lineHeight, setLineHeight] = useState('0');
    const [gridHeight, setGridHeight] = useState('0');
    useEffect(()=>{
        setHeight();
        window.addEventListener('resize',setHeight);
        return(()=>{
            window.removeEventListener('resize',setHeight);
        });
    });
    
    function setHeight() {
        let thisHeight = window.getComputedStyle(document.getElementById('mainHolder')).width;
        let numThisHeight = Number(thisHeight.split('px')[0]);
        thisHeight = numThisHeight < minWidth ? minWidth : numThisHeight;
        let gridHeight = thisHeight / state.BLOCKS_IN_ONE_LINE;
        setGridHeight(gridHeight);
        setLineHeight(thisHeight);
    }
  
    const [blockWidth, setBlcokWidth] = useState(Number(gridHeight));
    useEffect( ()=>{ 
        setBlcokWidth(Number(gridHeight));
    }, [gridHeight]);

    return (
        <Fragment>
                <EndGame width={window.innerWidth+'px'} height={window.innerHeight+'px'}></EndGame>
                <Container>
                    <SideHolder className={'sideHolder'}></SideHolder>
                <Main id={'mainHolder'} style={{ 'height': lineHeight + 'px', 'backgroundColor': state.BG_COLOR}}>
                        <BlocksContainer blockWidth={ blockWidth }></BlocksContainer>
                        <Grid gridHeight={gridHeight+'px'}></Grid>
                    </Main>
                    <SideHolder className={'sideHolder'}></SideHolder>
                </Container>  
                <Menus width={lineHeight+'px'}></Menus>
        </Fragment>
    );
}

export default MainContainer;