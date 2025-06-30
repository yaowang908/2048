// import PropTypes from 'prop-types';
import { convertor, reverseConvertor } from './convertor';
// import { BLOCKS_IN_ONE_LINE } from '../GameConfig';
import zip from 'lodash/zip';
import Cookies from 'js-cookie';
import { BlockData } from '../types';

// const BLOCKS_IN_ONE_LINE = Cookies.get('BlocksPerLine');

const moveHandler = (
    eventType: string,
    data: BlockData[],
    isGameOver = false,
    score = 0,
    BLOCKS_IN_ONE_LINE: number
): [BlockData[], number] => {
    if (isGameOver) return [data, score];

    const twoDArray = convertor(data, BLOCKS_IN_ONE_LINE);

    if (eventType === 'ArrowDown') {
        let A = [...twoDArray];
        for (let i = BLOCKS_IN_ONE_LINE - 1; i >= 0; i -= 1) {
            let thisArray: number[] = [];
            for (let j = BLOCKS_IN_ONE_LINE - 1; j >= 0; j -= 1) {
                if (A[i][j] !== 0) {
                    thisArray.push(A[i][j]);
                    A[i][j] = 0;
                }
            }
            for (let m = 0; m < thisArray.length - 1; m += 1) {
                if (thisArray[m] === 0) {
                    thisArray[m] = thisArray[m + 1];
                    thisArray[m + 1] = 0;
                }
                if (thisArray[m] === thisArray[m + 1]) {
                    thisArray[m] = thisArray[m] + thisArray[m + 1];
                    thisArray[m + 1] = 0;
                    score += thisArray[m]; //increase game score
                }
            }
            thisArray.length = BLOCKS_IN_ONE_LINE;
            for (let n = 0; n < thisArray.length; n += 1) {
                if (!!thisArray[n]) {
                } else {
                    thisArray[n] = 0;
                }
            }
            A[i] = thisArray.reverse();
        }

        return [reverseConvertor(A, BLOCKS_IN_ONE_LINE), score];
    }

    if (eventType === 'ArrowUp') {
        let A = [...twoDArray];
        for (let i = BLOCKS_IN_ONE_LINE - 1; i >= 0; i -= 1) {
            let thisArray: number[] = [];
            for (let j = BLOCKS_IN_ONE_LINE - 1; j >= 0; j -= 1) {
                if (A[i][j] !== 0) {
                    thisArray.push(A[i][j]);
                    A[i][j] = 0;
                }
            }
            for (let m = thisArray.length - 1; m > 0; m -= 1) {
                if (thisArray[m] === 0) {
                    thisArray[m] = thisArray[m - 1];
                    thisArray[m - 1] = 0;
                }
                if (thisArray[m] === thisArray[m - 1]) {
                    thisArray[m] = thisArray[m] + thisArray[m - 1];
                    thisArray[m - 1] = 0;
                    score += thisArray[m];
                }
            }
            for (let n = thisArray.length - 1; n > 0; n -= 1) {
                if (!!thisArray[n]) {
                } else {
                    thisArray[n] = 0;
                }
            }
            A[i] = thisArray.reverse();
        }
        return [reverseConvertor(A, BLOCKS_IN_ONE_LINE), score];
    }

    if (eventType === 'ArrowLeft') {
        let A = zip(...twoDArray);
        for (let i = BLOCKS_IN_ONE_LINE - 1; i >= 0; i -= 1) {
            let thisArray: any[] = [];
            for (let j = 0; j <= BLOCKS_IN_ONE_LINE - 1; j += 1) {
                if (A[i][j] !== 0) {
                    thisArray.push(A[i][j]);
                    A[i][j] = 0;
                }
            }
            for (let m = 0; m < thisArray.length - 1; m += 1) {
                if (thisArray[m] === 0) {
                    thisArray[m] = thisArray[m + 1];
                    thisArray[m + 1] = 0;
                }
                if (thisArray[m] === thisArray[m + 1]) {
                    thisArray[m] = thisArray[m] + thisArray[m + 1];
                    thisArray[m + 1] = 0;
                    score += thisArray[m];
                }
            }

            for (let n = BLOCKS_IN_ONE_LINE - 1; n > 0; n -= 1) {
                if (!!thisArray[n]) {
                } else {
                    thisArray[n] = 0;
                }
            }
            A[i] = thisArray;
        }
        return [reverseConvertor(zip(...A), BLOCKS_IN_ONE_LINE), score];
    }

    if (eventType === 'ArrowRight') {
        let A = zip(...twoDArray);

        for (let i = BLOCKS_IN_ONE_LINE - 1; i >= 0; i -= 1) {
            let thisArray: any[] = [];
            for (let j = BLOCKS_IN_ONE_LINE - 1; j >= 0; j -= 1) {
                if (A[i][j] !== 0) {
                    thisArray.push(A[i][j]);
                    A[i][j] = 0;
                }
            }
            for (let m = 0; m < thisArray.length - 1; m += 1) {
                if (thisArray[m] === 0) {
                    thisArray[m] = thisArray[m + 1];
                    thisArray[m + 1] = 0;
                }
                if (thisArray[m] === thisArray[m + 1]) {
                    thisArray[m] = thisArray[m] + thisArray[m + 1];
                    thisArray[m + 1] = 0;
                    score += thisArray[m]; //increase game score
                }
            }
            for (let n = BLOCKS_IN_ONE_LINE - 1; n > 0; n -= 1) {
                if (!!thisArray[n]) {
                    //do nothing
                } else {
                    thisArray[n] = 0;
                }
            }
            A[i] = thisArray.reverse();
        }
        return [reverseConvertor(zip(...A), BLOCKS_IN_ONE_LINE), score];
    }

    return [data, score];
};

// moveHandler.propTypes = {
//     eventType: PropTypes.string.isRequired,
//     data: PropTypes.arrayOf(
//             PropTypes.shape({
//                 position: PropTypes.arrayOf(PropTypes.number),
//                 num: PropTypes.number,
//             })
//         ),
//     isGameOver: PropTypes.bool,
//     score: PropTypes.number.isRequired,
// }

export default moveHandler;