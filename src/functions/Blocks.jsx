import React, { useState, useEffect, Fragment, useContext } from 'react';
import {GameContext} from '../components/GameContext';
import PropTypes from 'prop-types';
import Block from '../components/Block';

const Blocks = function drawAllBlocks(props) {
    const { state, dispatch } = useContext(GameContext);

    const [data,setData] = useState(props.data);
    useEffect(() => {
        setData(props.data);
    },[props.data]);

    const [blockWidth, setBlockWidth] = useState(props.blockWidth);
    useEffect(() => {
        setBlockWidth(props.blockWidth);
    },[props.blockWidth]);

    return(
        <Fragment>
            {data.map((x, index)=>{
                return <Block num={x.num} key={index} position={x.position} width={blockWidth} gameLevel={state.BLOCKS_IN_ONE_LINE}></Block>
            })}
        </Fragment>
    );
}

Blocks.propTypes = {
    data: PropTypes.arrayOf(
                PropTypes.shape({
                    position: PropTypes.arrayOf(PropTypes.number),
                    num: PropTypes.number,
                })
            ),
    blockWidth: PropTypes.number,
}

export default Blocks;