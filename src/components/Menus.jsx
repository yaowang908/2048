import React, { useState, useEffect,useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GameContext } from './GameContext';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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
    const [ isOpen, setIsOpen ] = useState(false);

    return(
        <MenuContainer style={{ 'width':width }}>
            {/* <Button variant="contained" color="secondary" size="medium">Game Level</Button> */}
            <List style={{
                    'backgroundColor': '#f50057',
                    'boxShadow': '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
                    'borderRadius': '4px', 
                    }}>
                <ListItem button onClick={()=>{setIsOpen(!isOpen)}}>
                    <ListItemText inset 
                    primary={<span style={{ 
                            "color": "#fff",
                            'fontWeight': '500',
                            'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
                            'fontSize': '0.875rem', 
                        }}>GAME LEVEL</span>} 
                    style={{
                        'color': '#fff',
                        'paddingLeft': '10px',
                        'marginTop': '-10px',
                    }}/>
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding style={{
                        'backgroundColor': '#282c34',
                    }}>
                        <ListItem button>
                            <ListItemText inset primary={<span style={{"color": "#fff"}}>4 x 4</span>} style={{
                                'paddingLeft': '10px',
                                'textAlign': 'center',
                                'borderBottom': '1px solid #fff',
                            }}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText inset primary={<span style={{"color": "#fff"}}>5 x 5</span>} style={{
                                'paddingLeft': '10px',
                                'textAlign': 'center',
                                'borderBottom': '1px solid #fff',
                            }}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText inset primary={<span style={{"color": "#fff"}}>10 x 10</span>} style={{
                                'paddingLeft': '10px',
                                'textAlign': 'center',
                                'borderBottom': '1px solid #fff',
                            }}/>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <Button variant="contained" color="secondary" size="medium" onClick={()=>setGameRestart(true)}>Restart</Button>
        </MenuContainer>      
    );
}

Menus.propTypes = {
    width: PropTypes.string.isRequired,
}

export default Menus;