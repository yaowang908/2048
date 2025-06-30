import React, { Fragment, useContext } from 'react';
import { GameContext } from '../../components/GameContext';
import Block from '../../components/Block';
import { BlockData } from '../types';

interface BlocksProps {
  data: BlockData[];
  blockWidth: number;
}

const Blocks: React.FC<BlocksProps> = ({ data, blockWidth }) => {
  const { state } = useContext(GameContext);

  if (!state) {
    return null;
  }

  return (
    <Fragment>
      {data.map((x, index) => {
        return (
          <Block
            num={x.num}
            key={index}
            position={x.position}
            width={blockWidth}
          />
        );
      })}
    </Fragment>
  );
};

export default Blocks;
