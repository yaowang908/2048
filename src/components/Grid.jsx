import React, { useState, useEffect, Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { GameContext } from './GameContext';

const Grid = function getGrid(props) {
    const { BLOCKS_IN_ONE_LINE, BG_BLOCK_COLOR, BG_COLOR } = useContext(GameContext);

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
                    return <div key={x} 
                            id={'grid_' + x} 
                            style={{    
                                        'height': gridHeight, 
                                        'width': gridHeight,
                                        'flexGrow': '1',
                                        'flexShrink': '1',
                                        'flexBasis': gridHeight,
                                        'backgroundColor': BG_BLOCK_COLOR,
                                        'border': '10px solid '+ BG_COLOR,
                                        'boxSizing': 'border-box',
                                                }}>
                            </div>
                })
            }
        </Fragment>
    );
}

Grid.propTypes = {
    gridHeight: PropTypes.string.isRequired,
}

export default Grid;