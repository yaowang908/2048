import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from './GameContext';

interface HeaderProps {
    height: string;
    children?: React.ReactNode;
}

const HeaderContainer = styled.div<HeaderProps>`
  width: 100%;
  display: flex;
  margin: 10px 0px;
  height: ${({ height }) => height};
`;

// flex - shrink: 1;
// flex - basis: 0;
const Header: React.FC = () => {
    const { state } = useContext(GameContext);

    if (!state) {
        return null;
    }

    return (
        <HeaderContainer height={state.HEADER_HEIGHT} >
            <div style={{ 'flex': '1 1 auto' }}></div>
            <div style={{
                'flex': '2 1 0',
                'display': 'flex',
                'minWidth': '400px',
                'maxWidth': '500px',
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
            <div style={{ 'flex': '1 1 auto' }}></div>
        </HeaderContainer>
    );
}

export default Header;