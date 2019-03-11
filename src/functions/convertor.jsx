import PropTypes from 'prop-types';
import { BLOCKS_IN_ONE_LINE } from '../GameConfig';

const convertor = function convertObjectArrayToTwoDimentionArray(data) {
    let result = [];
    let subLevel = [];
    for(let m=0; m<BLOCKS_IN_ONE_LINE; m+=1) {
        subLevel.push(0);
    }
    for(let n=0; n<BLOCKS_IN_ONE_LINE; n+=1) {
        result.push([...subLevel]);
    }

    data.map(x => {
        result[x.position[0]][x.position[1]] = x.num;
    });

    return result;
}

convertor.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.arrayOf(PropTypes.number),
            num: PropTypes.number,
        })
    ),
}

const reverseConvertor = function (data) {
    let result = [];

    for (let m = 0; m < BLOCKS_IN_ONE_LINE; m += 1) {
        for (let n = 0; n < BLOCKS_IN_ONE_LINE; n += 1) {
            if(data[m][n]) {
                result.push({
                    position: [m,n],
                    num: data[m][n],
                });
            }
        }
    }

    return result;
}

reverseConvertor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
};

export { convertor, reverseConvertor };