import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BLOCKS_IN_ONE_LINE, BG_BLOCK_COLOR, BG_COLOR } from '../GameConfig';

const GridBlock = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: ${1 / BLOCKS_IN_ONE_LINE};
    background-color: ${BG_BLOCK_COLOR};
    border: 10px solid ${BG_COLOR};
    box-sizing: border-box;
`;

const Grid = function getGrid(props) {
    let grids = [];
    for (let i = 0; i < BLOCKS_IN_ONE_LINE ** 2; i++) {
        grids.push(i);
    }

    const [ gridHeight, setGridHeight ] = useState(props.gridHeight);
    useEffect( ()=>{
        setGridHeight(props.gridHeight);
    }, [props.gridHeight]);

    return (
        <Fragment>
            {
                grids.map(x => {
                    return <GridBlock key={x} 
                            id={'grid_' + x} 
                            style={{ 'height': gridHeight, 
                                        'width': gridHeight, 
                                    }}>
                            </GridBlock>
                })
            }
        </Fragment>
    );
}

Grid.propTypes = {
    gridHeight: PropTypes.string.isRequired,
}

export default Grid;