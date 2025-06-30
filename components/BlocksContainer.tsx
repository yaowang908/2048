import React from 'react';
import Blocks from '../lib/functions/Blocks';
import { BlockData } from '../lib/types';

interface BlocksContainerProps {
  data: BlockData[];
  blockWidth: number;
}

const BlocksContainer: React.FC<BlocksContainerProps> = ({
  data,
  blockWidth,
}) => {
  return (
    <div style={{ position: 'absolute' }}>
      <Blocks data={data} blockWidth={blockWidth}></Blocks>
    </div>
  );
};

export default BlocksContainer;
