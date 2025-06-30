import { BlockData } from '../types';
// import { BLOCKS_IN_ONE_LINE } from '../GameConfig';

// const BLOCKS_IN_ONE_LINE = Cookies.get('BlocksPerLine');

export const convertor = (
    data: BlockData[] | null,
    BLOCKS_IN_ONE_LINE: number
): number[][] => {
    let result: number[][] = [];
    let subLevel: number[] = [];
    for (let m = 0; m < BLOCKS_IN_ONE_LINE; m += 1) {
        subLevel.push(0);
    }
    for (let n = 0; n < BLOCKS_IN_ONE_LINE; n += 1) {
        result.push([...subLevel]);
    }
    if (!data) return result;

    data.forEach((x) => {
        result[x.position[0]][x.position[1]] = x.num;
    });

    return result;
}

export const reverseConvertor = (
    data: number[][],
    BLOCKS_IN_ONE_LINE: number
): BlockData[] => {
    let result: BlockData[] = [];

    for (let m = 0; m < BLOCKS_IN_ONE_LINE; m += 1) {
        for (let n = 0; n < BLOCKS_IN_ONE_LINE; n += 1) {
            if (data[m][n]) {
                result.push({
                    position: [m, n],
                    num: data[m][n],
                });
            }
        }
    }

    return result;
}