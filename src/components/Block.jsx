import React, { useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import { GameContext } from './GameContext';

const Block = function indivitualBlock(props) {
    // const { COLOR_SCHEME, BG_COLOR } = useContext(GameContext);
    const {state, dispatch} = useContext(GameContext);

    const [width, setWidth] = useState(0);
    useEffect( () => {
        setWidth(props.width);
    },[props.width]);

    const [position, setPosition] = useState(props.position);
    useEffect( () => {
        setPosition(props.position);
    },[props.position]);

    const [color, setColor] = useState(state.COLOR_SCHEME[2]);
    useEffect( () => {
        if (!!state.COLOR_SCHEME[props.num]) setColor(state.COLOR_SCHEME[props.num]);
    },[props.num]);

    return(
        <div style={{
            'width': width+'px',
            'height': width + 'px',
            'position': 'absolute',
            'left': (position[0] * width) + 'px',
            'top': (position[1] * width) + 'px',
            'lineHeight': (width - 20) + 'px',
            'textAlign': 'center',
            'color': props.num>256 ? '#f2f2f2' : '#000',
            'fontSize': props.num>64 ? '2rem' : '2.5rem',
            'fontWeight': 'bold',
            'backgroundColor': color,
            'boxSizing': 'border-box',
            'border': '10px solid ' + state.BG_COLOR,
        }}>
            {props.num}
        </div>
    );
}

Block.propTypes = {
    num: PropTypes.number.isRequired,
    position: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
}

export default Block;