import React, { Fragment, useContext } from 'react';
import { GameContext } from './GameContext';

interface GridProps {
    gridHeight: string;
}

const Grid: React.FC<GridProps> = ({ gridHeight }) => {
    const { state } = useContext(GameContext);

    if (!state) {
        return null;
    }

    let grids = [];
    for (let i = 0; i < state.BLOCKS_IN_ONE_LINE ** 2; i++) {
        grids.push(i);
    }

    return (
        <Fragment>
            {grids.map((x) => {
                return (
                    <div
                        key={x}
                        id={'grid_' + x}
                        style={{
                            height: gridHeight,
                            width: gridHeight,
                            flexGrow: '1',
                            flexShrink: '1',
                            flexBasis: gridHeight,
                            backgroundColor: state.BG_BLOCK_COLOR,
                            border: '10px solid ' + state.BG_COLOR,
                            boxSizing: 'border-box',
                        }}
                    ></div>
                );
            })}
        </Fragment>
    );
};

export default Grid;