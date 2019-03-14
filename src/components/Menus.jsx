import React, { useState, useEffect,useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { GameContext } from './GameContext';

const MenuContainer = styled.div`
    margin-top: 50px;
    height: 50px;
    display: flex;
    justify-content: space-between;
`;

const Menus = function CreateBottomMenu(props) {
    const [width, setWidth] = useState('400px');

    useEffect( () => {
        setWidth(props.width);
    }, [props.width] );

    const { gameRestart, setGameRestart  } = useContext(GameContext);

    return(
        <MenuContainer style={{ 'width':width }}>
            <Button variant="contained" color="secondary" size="medium">Game Level</Button>
            <Button variant="contained" color="secondary" size="medium" onClick={()=>setGameRestart(true)}>Restart</Button>
        </MenuContainer>      
    );
}

Menus.propTypes = {
    width: PropTypes.string.isRequired,
}

export default Menus;