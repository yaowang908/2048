import React, {  Fragment, useState, useEffect, } from 'react';
import styled from 'styled-components';

import { BLOCKS_IN_ONE_LINE, BG_COLOR, BG_BLOCK_COLOR, } from '../GameConfig';
import Menus from './Menus';
import BlocksContainer from './BlocksContainer';
import EndGame from './EndGameScreen';

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
    background-color: ${BG_COLOR};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: content-box;
    position: relative;
`;

const GridBlock = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: ${1 / BLOCKS_IN_ONE_LINE};
    background-color: ${BG_BLOCK_COLOR};
    border: 10px solid ${BG_COLOR};
    box-sizing: border-box;
`;

const SideHolder = styled.div`
    flex-grow: 1;
`;

const MainContainer = function MainPlayGround() {

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
        let gridHeight = thisHeight / BLOCKS_IN_ONE_LINE;
        setGridHeight(gridHeight);
        setLineHeight(thisHeight);
    }
    
    function getGrid() {
        let grids = [];
        for (let i = 0; i < BLOCKS_IN_ONE_LINE ** 2; i++) {
            grids.push(i);
        }
        return grids.map(x=>{
            return <GridBlock key={x} id={'grid_'+x} style={{'height':gridHeight,'width':gridHeight}}></GridBlock>
        });   
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
                    <Main id={'mainHolder'} style={{'height':lineHeight+'px'}}>
                        <BlocksContainer blockWidth={ blockWidth }></BlocksContainer>
                        { 
                            getGrid()
                        }
                    </Main>
                    <SideHolder className={'sideHolder'}></SideHolder>
                </Container>  
                <Menus width={lineHeight+'px'}></Menus>
        </Fragment>
    );
}

export default MainContainer;