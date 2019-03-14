import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { GAME_NAME, GAME_DESCRIPTION, HEADER_HEIGHT } from '../GameConfig';
import { GameContext } from './GameContext';

const HeaderContainer = styled.div`
    width: 100%;
    height: ${HEADER_HEIGHT};
    display: flex;
    margin: 10px 0px;
`;

// flex - shrink: 1;
// flex - basis: 0;
const Header = function headerContainsScoreAndDescription() {
    const { context, setContext } = useContext(GameContext);

    return(
        <HeaderContainer>
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
                        'height': HEADER_HEIGHT,
                        'maxWidth': '50%',
                    }}>
                    <div style={{
                        'flex': '2 1 auto',
                        'textAlign': 'left',
                        'fontSize': '3rem',
                        'fontWeight': 'bold',
                    }}>
                        {GAME_NAME}                   
                    </div>
                    <div style={{
                        'flex': '1 1 auto',
                        'textAlign': 'left',
                        'fontSize': '0.8rem',
                    }}>
                        {GAME_DESCRIPTION}
                    </div>
                </div>
                <div style={{ 'flex':'1 1 auto' }}>
                    <h1>{context.score}</h1>
                </div>
            </div>
            <div style={{ 'flex':'1 1 auto' }}></div>
        </HeaderContainer>
    );
}

export default Header;