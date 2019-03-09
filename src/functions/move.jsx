import PropTypes from 'prop-types';
import { convertor, reverseConvertor } from './convertor';

const moveHandler = function listenToKeyboardAndRecieveDataAndReturnMutated(eventType, data) {
    if( eventType === 'ArrowDown' ) {
        console.log('ArrowDown')
        const twoDArray = convertor(data);
        // check every block, see if it should move
        // set attribute to those should move
        // and ONLY first couple got collapsed
    }

    if( eventType === 'ArrowUp') {
        console.log('ArrowUp')

    }

    if( eventType === 'ArrowLeft') {
        console.log('ArrowLeft')

    }

    if( eventType === 'ArrowRight') {
        console.log('ArrowRight')

    }
    //return newData
}

moveHandler.propTypes = {
    eventType: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
            PropTypes.shape({
                position: PropTypes.arrayOf(PropTypes.number),
                num: PropTypes.number,
            })
        ),
}

export default moveHandler;