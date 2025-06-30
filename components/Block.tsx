import React, { useContext } from 'react';
import { GameContext } from './GameContext';

interface BlockProps {
    num: number;
    position: [number, number];
    width: number;
}

const Block: React.FC<BlockProps> = ({ num, position, width }) => {
    const { state } = useContext(GameContext);

    if (!state) {
        return null;
    }

    const color = state.COLOR_SCHEME[num] || state.COLOR_SCHEME.super;

    return (
        <div
            style={{
                width: width + 'px',
                height: width + 'px',
                position: 'absolute',
                left: position[0] * width + 'px',
                top: position[1] * width + 'px',
                lineHeight: width - 20 + 'px',
                textAlign: 'center',
                color: num > 256 ? '#f2f2f2' : '#000',
                fontSize:
                    state.BLOCKS_IN_ONE_LINE < 10
                        ? num > 64
                            ? '2rem'
                            : '2.5rem'
                        : '0.8rem',
                fontWeight: 'bold',
                backgroundColor: color,
                boxSizing: 'border-box',
                border: '10px solid ' + state.BG_COLOR,
            }}
        >
            {num}
        </div>
    );
};

export default Block;