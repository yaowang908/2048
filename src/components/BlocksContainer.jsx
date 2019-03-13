import React, { Fragment, useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import Blocks from '../functions/Blocks';
import moveHandler from '../functions/move';
import { generator, generatorOne } from '../functions/generator';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import Cookies from 'js-cookie';

const BlocksContainer = function groupAllBlocksTogether(props) {

    const initState = Cookies.getJSON('data') || generator([]);
    const [data, setData] = useState(initState);

    function eventHandler(e) {
        let newState = moveHandler(e.code, data);
        let gameIsOver = false;
        let movementFailure = false;

        if(!newState) gameIsOver = true;
        let diffBtwStates = differenceWith(newState, data, isEqual)
        if (!diffBtwStates.length) movementFailure = true;

        // if no node are moved, should NOT generator new node
        if(!movementFailure) {
            newState = generatorOne(newState);
            if (!!newState) setData(newState);
            Cookies.set('data',newState, { path: ''});
        }

        // TODO: if no space left should !!failed!!

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