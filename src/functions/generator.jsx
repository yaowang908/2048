import PropTypes from 'prop-types';
import { convertor, reverseConvertor } from './convertor';import sample from 'lodash/sample';
// import { BLOCKS_IN_ONE_LINE } from '../GameConfig';
import sampleSize from 'lodash/sampleSize';
import Cookies from 'js-cookie';

const BLOCKS_IN_ONE_LINE = Cookies.get('BlocksPerLine');

const generator = function generatorTwoNodesRandomly(data) {
    const twoDArray = convertor(data);
    const dataCopy = [...twoDArray];

    const resultTwoDArray = generatorWithTwoDArray(dataCopy);
     
    if (!resultTwoDArray) return false;
    const result = reverseConvertor(resultTwoDArray);
    return result;
}

const generatorOne = function generatorOneNodeRandomly(data) {
    const twoDArray = convertor(data);
    const dataCopy = [...twoDArray];

    const resultTwoDArray = generatorWithTwoDArray(dataCopy, 1);

    if (!resultTwoDArray) return false;
    const result = reverseConvertor(resultTwoDArray);
    return result;
}

const generatorWithTwoDArray = function (data, size = 2) {
    let potentialPosition = [];
    let topFloor = 0;
    let dataCopy = [...data];
    for (let m = 0; m < BLOCKS_IN_ONE_LINE; m += 1) {
        for (let n = 0; n<BLOCKS_IN_ONE_LINE; n+=1) {
            if(!dataCopy) dataCopy = 0;
        }
    }
    for (let m = 0; m < dataCopy.length; m += 1) {
        for (let n = 0; n < dataCopy[m].length; n += 1) {
            if (dataCopy[m][n] > topFloor) topFloor = dataCopy[m][n];
            if(!dataCopy[m][n]) potentialPosition.push([m, n]);
        }
    }

    // if no more spaces then !!failed!!
    if (potentialPosition.length === 0) return false;

    if (size === 2) {
        const [num1, num2] = generateNumber(topFloor);
        const [position1, position2] = generatePosition(potentialPosition);

        dataCopy[position1[0]][position1[1]] = num1;
        dataCopy[position2[0]][position2[1]] = num2;

        return dataCopy;
    } 

    const num = generateNumber(topFloor, 1);
    const position = generatePosition(potentialPosition, 1);
    dataCopy[position[0]][position[1]] = num;
    return dataCopy;
}

generator.defaultProps = {
    data: [],
};

// {
//     position: [3,3],
//     num: 8
// }
generator.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.arrayOf(PropTypes.number),
            num: PropTypes.number,
        })
        ),
    }
    
/**
 * @param {num} topFloor indicates current biggest number on plate  
 */
const generateNumber = function (topFloor, size = 2) {
    let topFloorCheckLowest = 2;
    if( topFloor > 2 ) topFloorCheckLowest = topFloor; 
    const pool = [2, 4, 8, 16, 32].filter(x=> x <= topFloorCheckLowest);
    const num1 = sample(pool);
    const num2 = sample(pool);
    if (size === 2) return [num1,num2];
    return num1;
}

generateNumber.propTypes = {
    topFloor : PropTypes.number.isRequired,
}

const generatePosition = function (potentialPosition, size = 2) {
    if (size === 2) {
        const result = sampleSize(potentialPosition, 2);
        return result;    
    } 
    const result = sample(potentialPosition);
    return result;
}

generatePosition.propTypes = {
    potentialPosition: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number)
    ).isRequired,
}

export { generator, generatorOne, generatorWithTwoDArray };