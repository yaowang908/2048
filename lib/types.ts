export interface State {
  isGameOver: boolean;
  score: number;
  gameRestart: boolean;
  isLevelUpdate: boolean;
  BLOCKS_IN_ONE_LINE: number;
  BG_COLOR: string;
  BG_BLOCK_COLOR: string;
  GAME_NAME: string;
  GAME_DESCRIPTION: string;
  HEADER_HEIGHT: string;
  COLOR_SCHEME: Record<string, string>;
}

export type Action =
  | { type: 'gameOver'; isGameOver: boolean }
  | { type: 'updateScore'; score: number }
  | { type: 'restart'; gameRestart: boolean }
  | { type: 'setGameLevel'; gameLevel: number }
  | { type: 'isLevelUpdate'; isLevelUpdate: boolean };

export interface BlockData {
  position: [number, number];
  num: number;
  merged?: boolean;
}
