import PropTypes from 'prop-types';
import { convertor, reverseConvertor } from './convertor';
import { BLOCKS_IN_ONE_LINE } from '../GameConfig';

const moveHandler = function listenToKeyboardAndRecieveDataAndReturnMutated(eventType, data) {
    if( eventType === 'ArrowDown' ) {
        console.log('ArrowDown')
        const twoDArray = convertor(data);
        // check every block, see if it should move
        // set attribute to those should move
        // and ONLY first couple got collapsed
        let A = [...twoDArray];
        for (let i = BLOCKS_IN_ONE_LINE-1; i>=0; i-=1) {
            let thisArray = [];
            for (let j = BLOCKS_IN_ONE_LINE-1; j>=0; j-=1) {
                if (A[i][j] !== 0) {
                    thisArray.push(A[i][j]);
                    A[i][j] = 0;
                }
            }
            for (let m=0; m<thisArray.length-1; m++) {
                if (thisArray[m] === 0) {
                    thisArray[m] = thisArray[m+1];
                    thisArray[m+1] = 0;
                }
                if (thisArray[m] === thisArray[m+1]) {
                    thisArray[m] = (thisArray[m]+thisArray[m+1]);
                    thisArray[m+1] = 0;
                }
                // A[i][BLOCKS_IN_ONE_LINE-1-m] = thisArray[m];
            }
            thisArray.length = BLOCKS_IN_ONE_LINE;//fill thisArray with undefined to length to BLOCKS_IN_ONE_LINE
            for (let n=0; n<thisArray.length; n+=1) {
                if(!!thisArray[n]) {
                    //do nothing
                } else {
                    thisArray[n] = 0;
                }
            }
            A[i] = thisArray.reverse();
        }// end of move down
        return reverseConvertor(A);
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