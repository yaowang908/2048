import { convertor, reverseConvertor } from './convertor';
import sample from 'lodash/sample';
// import { BLOCKS_IN_ONE_LINE } from '../GameConfig';
import sampleSize from 'lodash/sampleSize';
import { BlockData } from '../types';

// const BLOCKS_IN_ONE_LINE = Cookies.get('BlocksPerLine');

export const generator = (
  data: BlockData[],
  BLOCKS_IN_ONE_LINE: number
): BlockData[] | false => {
  const twoDArray = convertor(data, BLOCKS_IN_ONE_LINE);
  const dataCopy = [...twoDArray];

  const resultTwoDArray = generatorWithTwoDArray(
    dataCopy,
    2,
    BLOCKS_IN_ONE_LINE
  );

  if (!resultTwoDArray) return false;

  const result = reverseConvertor(resultTwoDArray, BLOCKS_IN_ONE_LINE);
  return result;
};

export const generatorOne = (
  data: BlockData[],
  BLOCKS_IN_ONE_LINE: number
): BlockData[] | false => {
  const twoDArray = convertor(data, BLOCKS_IN_ONE_LINE);
  const dataCopy = [...twoDArray];

  const resultTwoDArray = generatorWithTwoDArray(
    dataCopy,
    1,
    BLOCKS_IN_ONE_LINE
  );

  if (!resultTwoDArray) return false;
  const result = reverseConvertor(resultTwoDArray, BLOCKS_IN_ONE_LINE);
  return result;
};

export const generatorWithTwoDArray = (
  data: number[][],
  size = 2,
  BLOCKS_IN_ONE_LINE: number
): number[][] | false => {
  let potentialPosition: [number, number][] = [];
  let topFloor = 0;
  let dataCopy = [...data];

  for (let m = 0; m < dataCopy.length; m += 1) {
    for (let n = 0; n < dataCopy[m].length; n += 1) {
      if (dataCopy[m][n] > topFloor) topFloor = dataCopy[m][n];
      if (!dataCopy[m][n]) potentialPosition.push([m, n]);
    }
  }

  // if no more spaces then !!failed!!
  if (potentialPosition.length === 0) return false;

  if (size === 2) {
    const nums = generateNumber(topFloor);
    const positions = generatePosition(potentialPosition);

    if (!nums || !positions || positions.length < 2 || !Array.isArray(nums))
      return false;

    dataCopy[positions[0][0]][positions[0][1]] = nums[0];
    dataCopy[positions[1][0]][positions[1][1]] = nums[1];

    return dataCopy;
  }

  const num = generateNumber(topFloor, 1);
  const position = generatePosition(potentialPosition, 1);

  if (typeof num !== 'number' || !position) return false;

  if (Array.isArray(position[0]) || Array.isArray(position[1])) return false;
  dataCopy[position[0]][position[1]] = num;
  return dataCopy;
};

/**
 * @param {num} topFloor indicates current biggest number on plate
 */
const generateNumber = (
  topFloor: number,
  size = 2
): number[] | number | undefined => {
  let topFloorCheckLowest = 2;
  if (topFloor > 2) topFloorCheckLowest = topFloor;
  const pool = [2, 4, 8, 16, 32].filter((x) => x <= topFloorCheckLowest);

  if (size === 2) {
    const num1 = sample(pool);
    const num2 = sample(pool);
    if (num1 && num2) return [num1, num2];
    return undefined;
  }
  return sample(pool);
};

const generatePosition = (
  potentialPosition: [number, number][],
  size = 2
) => {
  if (size === 2) {
    return sampleSize(potentialPosition, 2);
  }
  return sample(potentialPosition);
};
