import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from './GameContext';

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 10px 0px;
`;

// flex - shrink: 1;
// flex - basis: 0;
const Header = function headerContainsScoreAndDescription() {
    // const { GAME_NAME, GAME_DESCRIPTION, HEADER_HEIGHT, COLOR_SCHEME } = useContext(GameContext);
    const {state, dispatch} = useContext(GameContext);

    // const { context, setContext } = useContext(GameContext);

    return(
        <HeaderContainer style={{ 'height': state.HEADER_HEIGHT}}>
            <div style={{ 'flex': '1 1 auto' }}></div>
            <div style={{ 
                        'flex': '2 1 0', 
                        'display': 'flex',
                        'minWidth': '400px',
                        'maxWidth': '600px', 
                    }}>
                <div style={{ 
                        'flex': '1 1 auto',
                        'textAlign': 'left', 
                        'display': 'flex',
                        'flexDirection': 'column',
                        'justifyContent': 'center',
                    'height': state.HEADER_HEIGHT,
                        'maxWidth': '50%',
                    }}>
                    <div style={{
                        'flex': '2 1 auto',
                        'textAlign': 'left',
                        'fontSize': '3rem',
                        'fontWeight': 'bold',
                    }}>
                        {state.GAME_NAME}                   
                    </div>
                    <div style={{
                        'flex': '1 1 auto',
                        'textAlign': 'left',
                        'fontSize': '0.8rem',
                    }}>
                        {state.GAME_DESCRIPTION}
                    </div>
                </div>
                <div style={{ 'flex': '1 1 auto', 'color': state.COLOR_SCHEME[128] }}>
                    <h1>{state.score}</h1>
                </div>
            </div>
            <div style={{ 'flex':'1 1 auto' }}></div>
        </HeaderContainer>
    );
}

export default Header;