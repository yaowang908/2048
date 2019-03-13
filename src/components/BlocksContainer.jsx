import React, { Fragment, useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import Blocks from '../functions/Blocks';
import moveHandler from '../functions/move';
import { generator, generatorOne } from '../functions/generator';

const BlocksContainer = function groupAllBlocksTogether(props) {

    const initState = generator([]);
    const [data, setData] = useState(initState);

    function eventHandler(e) {
        let newState = moveHandler(e.code, data);
        newState = generatorOne(newState);
        if (!!newState) setData(newState);
        //TODO: save state to cookie;
    }

    //add keyboard listener
    useEffect(() => {
        window.addEventListener('keydown', eventHandler);
        return () => {
            window.removeEventListener('keydown', eventHandler)
        };
    });

    return (
        <div style={{ 'position': 'absolute' }}>
            <Blocks
                data={data}
                blockWidth={props.blockWidth}
            ></Blocks>
        </div>
    );
}

BlocksContainer.defaultProps = {
    blockWidth: 120,
}

BlocksContainer.propTypes = {
    blockWidth : PropTypes.number.isRequired,
};

export default BlocksContainer;