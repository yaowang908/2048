import React, 
    { 
        Fragment, 
        useState, 
        useEffect, 
    } from 'react';
import styled from 'styled-components';

import {
    BLOCKS_IN_ONE_LINE,
    BG_COLOR,
    BG_BLOCK_COLOR,
} from '../GameConfig';
import Menus from './Menus';
import Blocks from '../functions/Blocks';
import moveHandler from '../functions/move';

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
        setGridHeight(gridHeight+'px');
        setLineHeight(thisHeight+'px');
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

    const [data, setData] = useState([
        {
            position:[2,2],
            num: 2,
        },
        {
            position: [1,2],
            num: 8
        },
        {
            position: [2,3],
            num: 2
        },
        {
            position: [3,2],
            num: 4 
        },
        {
            position: [3,3],
            num: 8
        }
    ]);
    
    function eventHandler(e) {
        let newState = moveHandler(e.code,data); 
        if (!!newState) setData(newState); 
    }

    //add keyboard listener
    useEffect(() => {
        window.addEventListener('keydown', eventHandler);
        return () => {
            window.removeEventListener('keydown', eventHandler)
        };
    });

    const [blockWidth, setBlcokWidth] = useState(Number(gridHeight.slice(0, -2)));
    useEffect( ()=>{ 
        setBlcokWidth(Number(gridHeight.slice(0, -2)));
    }, [gridHeight]);

    return (
        <Fragment>
            <Container>
                <SideHolder className={'sideHolder'}></SideHolder>
                <Main id={'mainHolder'} style={{'height':lineHeight}}>
                    <div style={{'position': 'absolute'}}>
                        <Blocks 
                            data = {data}
                            blockWidth={blockWidth}
                        ></Blocks>
                    </div>
                    { 
                        getGrid()
                    }
                </Main>
                <SideHolder className={'sideHolder'}></SideHolder>
            </Container>  
            <Menus width={lineHeight}></Menus>
        </Fragment>
    );
}

export default MainContainer;