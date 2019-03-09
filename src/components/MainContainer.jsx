import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    background-color: rgba(210,207,207,0.8);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const GridBlock = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 25%;
    background-color: rgba(210,207,207,0.8);
    border: 1px solid #fff;
    box-sizing: border-box;
`;

const SideHolder = styled.div`
    flex-grow: 1;
`;

function MainContainer() {

    const minWidth = 400;
    const [lineHeight, setLineHeight] = useState(0);
    const [gridHeight, setGridHeight] = useState(0);

    useEffect(()=>{
        setHeight();
        window.addEventListener('resize',setHeight);
        return(()=>{
            window.removeEventListener('resize',setHeight);
        });
    });

    function setHeight() {
        let _thisHeight = window.getComputedStyle(document.getElementById('mainHolder')).width;
        let _numThisHeight = Number(_thisHeight.split('px')[0]);
        _thisHeight = _numThisHeight < minWidth ? minWidth : _numThisHeight;
        let _gridHeight = _thisHeight/4;
        setGridHeight(_gridHeight+'px');
        setLineHeight(_thisHeight+'px');
    }

    function getGrid() {
        let grids = [];
        for (let i = 0; i < 16; i++) {
            grids.push(i);
        }
        return grids.map(x=>{
            return <GridBlock key={x} id={'grid_'+x} style={{'height':gridHeight,'width':gridHeight}}></GridBlock>
        });   
    }

    return (
        <Container>
            <SideHolder className={'sideHolder'}></SideHolder>
            <Main id={'mainHolder'} style={{'height':lineHeight}}>
                { 
                    getGrid()
                }
            </Main>
            <SideHolder className={'sideHolder'}></SideHolder>
        </Container>  
    );
}

export default MainContainer;