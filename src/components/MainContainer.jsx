import React, {  Fragment, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// import { BLOCKS_IN_ONE_LINE, BG_COLOR, } from '../GameConfig';
import Menus from './Menus';
import BlocksContainer from './BlocksContainer';
import Grid from './Grid';
import EndGame from './EndGameScreen';
import { GameContext } from './GameContext';
import { useSwipeable } from 'react-swipeable';
import { moveEventHandler } from '../functions/moveEventHandler';
import Cookies from 'js-cookie';
import { generator, generatorOne } from '../functions/generator';

const Container = styled.div`
    width: 100%;
    display: flex;
`;

const Main = styled.div`
    flex:2 1 0;
    min-width: 400px;
    max-width: 500px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: content-box;
    position: relative;
`;

const SideHolder = styled.div`
    flex: 1 1 auto;
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
  
    const [blockWidth, setBlockWidth] = useState(Number(gridHeight));
    useEffect( ()=>{ 
        setBlockWidth(Number(gridHeight));
    }, [gridHeight]);

    if (!Cookies.getJSON('data')) Cookies.set('data', [], { path: '' });
    const initState = ((Cookies.getJSON('data') && Cookies.getJSON('data').length === 0)) ? generator([], state.BLOCKS_IN_ONE_LINE) : Cookies.getJSON('data');
    const [data, setData] = useState(initState);
    //touch screen handlers
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => { console.log('left'); moveEventHandler({code: 'ArrowLeft'}, state, dispatch, data, setData) },
        onSwipedRight: () => { console.log('right'); moveEventHandler({ code: 'ArrowRight' }, state, dispatch, data, setData) },
        onSwipedUp: () => { console.log('up'); moveEventHandler({ code: 'ArrowUp' }, state, dispatch, data, setData) },
        onSwipedDown: () => { console.log('down'); moveEventHandler({ code: 'ArrowDown' }, state, dispatch, data, setData) },
        // preventDefaultTouchmoveEvent: false,
        trackMouse: true,
    });

    return (
        <Fragment>
                <EndGame width={window.innerWidth+'px'} height={window.innerHeight+'px'}></EndGame>
                <Container  {...swipeHandlers}>
                    <SideHolder className={'sideHolder'}></SideHolder>
                    <Main id={'mainHolder'} style={{ 'height': lineHeight + 'px', 'backgroundColor': state.BG_COLOR}}>
                        <BlocksContainer blockWidth={ blockWidth } data={data}></BlocksContainer>
                        <Grid gridHeight={gridHeight+'px'}></Grid>
                        <Menus width={lineHeight+'px'}></Menus>

                    </Main>
                    <SideHolder className={'sideHolder'}></SideHolder>
                </Container>  
        </Fragment>
    );
}

export default MainContainer;