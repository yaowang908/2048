import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOR_SCHEME, BG_COLOR } from '../GameConfig';

const Block = function indivitualBlock(props) {
    const [width, setWidth] = useState(0);
    useEffect( () => {
        setWidth(props.width);
    },[props.width]);

    const [position, setPosition] = useState([0,0]);
    useEffect( () => {
        setPosition(props.position);
    },[props.position]);

    const [color, setColor] = useState(COLOR_SCHEME[2]);
    useEffect( () => {
        if (!!COLOR_SCHEME[props.num]) setColor(COLOR_SCHEME[props.num]);
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
            'color': '#000',
            'fontSize': props.num>512 ? '2rem' : '2.5rem',
            'fontWeight': 'bold',
            'backgroundColor': color,
            'boxSizing': 'border-box',
            'border': '10px solid ' + BG_COLOR,
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