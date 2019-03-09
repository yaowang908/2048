import PropTypes from 'prop-types';

const generator = function generatorTwoNodesRandomly(data) {

}

const generateNumber = function () {
    const pool = [2, 4, 8, 16, 32];
    // TODO:number should not be bigger than current largest number on screen

}

const generatePosition = function () {
    // get all current positions
    // TODO: randomly generate two more on blanks
    // if no more spaces then !!failed!!

}

generator.defaultProps = {
    data: [],
};

generator.propTypes = {
    data: PropTypes.arrayOf(
            PropTypes.shape({
                position: PropTypes.arrayOf(PropTypes.number),
                num: PropTypes.number,
            })
        ),
}